export default function Carousel() {
  const links = [
    "https://www.static-src.com/siva/asset/12_2024/big-brand-day_DESKTOP_171224_1D.jpeg?w=1200",
    "https://www.static-src.com/siva/asset/12_2024/Clearance-Sale-blm-17des-Carousel-desktop-2000x500.jpg?w=1200",
    "https://www.static-src.com/siva/asset/12_2024/pokemon-festival_HP-2000x500-REV.jpg?w=1200",
    "https://www.static-src.com/siva/asset/12_2024/japfaxufs-blm-nov24-carousel-desktop.jpg?w=1200",
    "https://www.static-src.com/siva/asset/12_2024/teman-tanggal-tua_DESKTOP_181224_41D.jpg?w=1200",
  ];
  return (
    <div className="carousel w-full">
      {links.map((link, index) => (
        <div
          key={index}
          id={"slide" + String(index + 1)}
          className="carousel-item relative flex w-full justify-center"
        >
          <img src={link} className="w-10/12" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${index > 1 ? index : links.length}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${index < links.length - 1 ? index + 2 : 1}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
