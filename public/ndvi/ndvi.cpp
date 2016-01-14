//#include <opencv2/highgui/highgui.hpp>
#include <string>
#include <opencv2/opencv.hpp>
#include <iostream>

// This constant represents the maximum integer that can be represented with
// 3 bytes
int THREE_BYTES_MAX = 0xFFFFFF;
int BRIGHTNESS = 1;

int main(int argc, char* argv[])
{
    // the original nir image should be passed as the first parameter
    std::string nirImage = argv[1];

    // read the image into a matrix
    cv::Mat img = cv::imread(nirImage);

    /*
     * Iterate through every pixel of the nir (near-infrared) image, transforming
     * it into a NDVI (normalized difference vegetation index) version of the
     * image.
     * Since the image was taken with a red filter, blue actually represents
     * infrared and red and green represent normal visible light.
     */
    for (int y = 0; y < img.rows; ++y)
    {
      for (int x = 0; x < img.cols; ++x)
      {
        cv::Vec3b pixels = img.at<cv::Vec3b>(cv::Point(x,y));
        uchar blue = pixels.val[0];
        uchar green = pixels.val[1];
        uchar red = pixels.val[2];

        // this ndvi value is a 0.00 - 1.00 float that represents the
        // vegetation index of the current pixel
        //double ndvi = ((double)blue - (double)red) / ((double)blue + (double)red);
        double ndvi = ((double)blue - (double)red) / ((double)blue + (double)red);

        /*
         * Convert the ndvi value into a RGB color.
         * Note that 0xFF casts to an integer of:
         *  00000000 00000000 00000000 11111111
         */
        //  // first, scale the ndvi value to a 3 byte integer
        int ndviInt = (int)(ndvi * THREE_BYTES_MAX);
        //  // the red value is the 3rd byte
        //  red = (unsigned char)((ndviInt >> 16) & 0xFF);
        //  // the green value is the second byte
        //  green = (unsigned char)((ndviInt >> 8) & 0xFF);
        //  // the blue value is the first byte
        //  blue  = (unsigned char)(ndviInt & 0xFF);
        green = (1 - std::abs(ndvi)) * 255 * BRIGHTNESS;

        ndvi = (ndvi + 1) / 2;
         red = ndvi * 255 * BRIGHTNESS;
         blue = (1 - ndvi) * 255 * BRIGHTNESS;


         std::cout << "ndvi:  " << ndvi << ", red: " << (int)red
         << ", green: " << (int)green <<
         ", blue: " << (int)blue << std::endl;

         // now, reset the pixel and apply it to the matrix
         img.at<cv::Vec3b>(cv::Point(x,y)).val[0] = blue;
         img.at<cv::Vec3b>(cv::Point(x,y)).val[1] = green;
         img.at<cv::Vec3b>(cv::Point(x,y)).val[2] = red;
      }
    }

    // save the image back
    std::string pathOut(argv[1]);
    cv::imwrite(pathOut + "_ndvi", img);
}
