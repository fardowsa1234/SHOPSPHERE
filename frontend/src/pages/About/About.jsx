import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About ShopSphere</h1>
      
      <section className="about-section">
        <h2>ShopSphere: Your One-Stop Online Shopping Destination</h2>
        <p>At ShopSphere, we're changing the way you shop online. We've created a single website where you can find everything you need, making online shopping easier and more convenient than ever before.</p>
      </section>

      <section className="about-section">
        <h2>Here's what makes ShopSphere special:</h2>
        <ol>
          <li><strong>All Your Shopping Needs in One Place:</strong> Instead of visiting multiple websites, you can find a wide variety of products all on ShopSphere. From electronics to clothing, home goods to beauty products - we've got it all.</li>
          <li><strong>Bringing Sellers and Shoppers Together:</strong> We connect you directly with many different sellers. This means you have access to a huge range of products and can often find great deals.</li>
          <li><strong>Easy to Use:</strong> We've designed ShopSphere to be simple and intuitive. Whether you're tech-savvy or new to online shopping, you'll find our website easy to navigate and use.</li>
          <li><strong>Something for Everyone:</strong> With our diverse range of products, you're sure to find what you're looking for, whether it's everyday essentials or unique, hard-to-find items.</li>
          <li><strong>Safe and Secure:</strong> We prioritize the security of your personal information and transactions, so you can shop with peace of mind.</li>
        </ol>
      </section>

      <section className="about-section">
        <h2>Our Goal</h2>
        <p>Our goal is to make your online shopping experience enjoyable, efficient, and hassle-free. With ShopSphere, you can say goodbye to the frustration of hopping between multiple websites and hello to a new, streamlined way of shopping online.</p>
      </section>

      <section className="about-section">
        <h2>Key Features</h2>
        <ul>
          <li>Intuitive user interface for effortless navigation</li>
          <li>Advanced search and filter options for precise product discovery</li>
          <li>Secure payment gateway integration</li>
          <li>Personalized recommendations based on user preferences</li>
          <li>Seamless mobile experience for shopping on-the-go</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Team</h2>
        <p>ShopSphere was brought to life by a diverse team of five talented Moringa school Graduate, each bringing unique skills and perspectives to the project.</p>
      </section>


      <section className="about-section">
        <h2>Our Commitment</h2>
        <p>At ShopSphere, we're committed to continually improving and expanding our platform. We value user feedback and are dedicated to implementing new features and optimizations to enhance the shopping experience for our community.</p>
      </section>

      <footer className="about-footer">
        <p>Welcome to ShopSphere - where all your shopping needs are just a click away!</p>
        <p>Thank you for choosing ShopSphere. Happy shopping!</p>
      </footer>
    </div>
  );
};

export default About;