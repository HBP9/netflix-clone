import "./FeatureCards.css";

const features = [
  {
    id: 1,
    title: "Enjoy on your TV",
    description:
      "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    icon: "📺",
  },
  {
    id: 2,
    title: "Download your shows to watch offline",
    description:
      "Save your favourites easily and always have something to watch.",
    icon: "⬇️",
  },
  {
    id: 3,
    title: "Watch everywhere",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    icon: "📱",
  },
  {
    id: 4,
    title: "Create profiles for kids",
    description:
      "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
    icon: "👶",
  },
];

const FeatureCards = () => {
  return (
    <section className="features">
      <h2>More Reasons To Join</h2>
      <div className="features_grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature_card">
            <div className="feature_text">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
            <div className="feature_icon">{feature.icon}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
