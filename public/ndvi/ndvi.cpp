#include <opencv2/highgui/highgui.hpp>
#include <string>

int main(int argc, char* argv[])
{
    std::string nirImage = argv[1];

    cv::Mat image = imread(nirImage);

    for (int y = 0; y < img.rows; ++y)
    {
      for (int x = 0; x < img.cols; ++x)
      {
        Vec3b pixels = img.at<Vec3b>(Point(x,y));
        int red = pixels[0];
        int green = pixels[1];
        int nir = pixels[2];
        double ndvi = ((nir - vis) / (nir + vis) + 1) / 2;
      }
    }
}
