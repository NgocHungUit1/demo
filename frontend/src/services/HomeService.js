import ArrowButton from "@/components/Client/ArrowButton";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
export const newUpdateSettings = {
          dots: true,
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: false,
          speed: 2000,
          autoplaySpeed: 4000,
          nextArrow: (
              <ArrowButton small style2_next>
                  <RightOutlined />
              </ArrowButton>
          ),
          prevArrow: (
              <ArrowButton small style2_prev>
                  <LeftOutlined />
              </ArrowButton>
          ),
          responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ],
      };
export const comicsSeasonSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 4000,
        nextArrow: (
          <ArrowButton small style2_next>
              <RightOutlined />
          </ArrowButton>
      ),
      prevArrow: (
          <ArrowButton small style2_prev>
              <LeftOutlined />
          </ArrowButton>
      ),
        responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    };