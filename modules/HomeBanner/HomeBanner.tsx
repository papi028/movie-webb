import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IBanner } from "@types";
import styles from "./homeBanner.module.scss";

interface HomeBannerProps {
  banners: IBanner[];
}

const stylesSwiper = {
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  overflow: "hidden",
};

const HomeBanner = ({ banners }: HomeBannerProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Swiper loop navigation={true} modules={[Navigation]} style={stylesSwiper}>
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div>
                <picture>
                  <img alt={banner.title} src={banner.imageUrl} className={styles.thumbnail} />
                </picture>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeBanner;
