import "./SwiperSearchBlock.css";

export default function SwiperSearchBlock() {
  return (
    <>
      <aside className="swipeandsearch">
        <article className="swipe-search">
          <h4>Swiper & découvrir</h4>
          <p>
            Explorez notre catalogue d'activités de manière ludique et
            intuitive. Swipez pour créer votre collection personnelle
            d'expériences à vivre.
          </p>
          <button type="button">Commencez à swiper</button>
        </article>
        <article className="swipe-search">
          <h4>Moteur de recherche</h4>
          <p>
            Personnalisez votre expérience en quelques clics. Laissez nous vous
            guider vers des activités qui vous correspondent.
          </p>
          <button type="button">Commencez à rechercher</button>
        </article>
      </aside>
    </>
  );
}
