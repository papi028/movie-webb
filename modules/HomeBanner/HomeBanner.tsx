import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IBanner } from "@types";
import styles from "./homeBanner.module.scss";
import { CustomLink } from "components/CustomLink";
import { PATH } from "constants/path";
import { Image } from "components/Image";

interface HomeBannerProps {
  banners: IBanner[];
}

const stylesSwiper = {
  borderRadius: "8px",
  overflow: "hidden",
};

const HomeBanner = ({ banners }: HomeBannerProps) => {
  return (
    <section>
      <Swiper loop navigation={true} modules={[Navigation]} style={stylesSwiper}>
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <CustomLink href={`${PATH.watch}/${banner.jumpType}/${banner.id}`}>
              <Image src={banner.imageUrl} alt={banner.title} className={styles.banner} />
            </CustomLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeBanner;
