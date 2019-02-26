import React from 'react';
import '../styles/pages/introduction.scss';

class Introduction extends React.PureComponent {
  render() {
    return (
      <div className="main-content introduction-page">
        <div className="introduction-fade" />
        <section className="introduction-container">
          <div className="introduction-crawl">
            <div className="introduction-title">
              <p>Episode X</p>
              <h1>A New Engineer</h1>
            </div>

            <p>
              It is a period of great uncertainty at Zylo. A secret pivot to a Star Wars analytics
              platform has been thrown into doubt.
            </p>
            <p>
              Zylo engineers have managed to build a mostly-working prototype, but have run into
              serious obstacles and can go no further. However, all is not lost. Rumors of a
              front-end Jedi have reached the Zylo base.
            </p>
            <p>
              Help us, potential Zylo engineer. You&apos;re our only hope. Proceed to
              /secret_prototype to save our charts and the future of our business.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default Introduction;
