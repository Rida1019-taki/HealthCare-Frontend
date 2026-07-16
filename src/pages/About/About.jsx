import "./About.css";

function About() {
    return (
        <section className="about">

            <div className="about-container">

                <h1>About HealthCare</h1>

                <p className="about-text">
                    HealthCare est une plateforme moderne de gestion médicale conçue
                    pour faciliter le travail des médecins, des patients et des
                    administrateurs.
                </p>

                <div className="about-cards">

                    <div className="card">
                        <h3>👨‍⚕️ Notre Mission</h3>
                        <p>
                            Améliorer la gestion des soins de santé grâce à une
                            solution simple, rapide et sécurisée.
                        </p>
                    </div>

                    <div className="card">
                        <h3>🎯 Notre Vision</h3>
                        <p>
                            Offrir une expérience numérique moderne pour les
                            établissements de santé et leurs patients.
                        </p>
                    </div>

                    <div className="card">
                        <h3>🔒 Sécurité</h3>
                        <p>
                            Les données des patients sont protégées avec des
                            technologies modernes afin de garantir la confidentialité.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;