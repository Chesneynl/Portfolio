import HillhoutLogo from '../../../logos/HillhoutLogo';
import MrFilletLogo from '../../..//logos/MrFilletLogo';
import PrazLogo from '../../../logos/PrazLogo';
import VogelsLogo from '../../../logos/VogelsLogo';
import SolarNRGLogo from '../../../logos/SolarNRGLogo';
import AinablersLogo from '../../../logos/AinablersLogo';
import LeadHealthcareLogo from '../../../logos/LeadHealthcareLogo';
import MobielLogo from '../../../logos/MobielLogo';
import SyncVrLogo from '../../../logos/SyncVrLogo';

enum Tools {
    PYTHON = 'Python',
    MAGENTO = 'Magento',
    STORYBLOK = 'Storyblok CMS',
    NEXTJS = 'Next.js',
    SQUEEZELY = 'Squeezely',
    REDIS = 'Redis',
    VUEJS = 'Vue.js',
    NODEJS = 'Node.js',
    GOOGLE_PUBSUB = 'Google Pub/Sub',
    CLOUDFLARE = 'Cloudflare',
    SENTRY = 'Sentry',
    GTM = 'Google Tag Manager',
    HEADLESS = 'Headless',
    RUBY = 'Ruby on Rails',
    ELIXIR = 'Elixir',
    REACT = 'React',
    JQUERY = 'jQuery',
    CHROME_EXTENSION = 'Custom Chrome Extension',
    GSAP = 'GSAP',
    TAILWIND = 'Tailwind CSS',
    STYLED_COMPONENTS = 'Styled Components',
    JENKINS = 'Jenkins',
    ASTRO = 'Astro',
    GRAPHQL = 'GraphQL',
    SUPABASE = 'Supabase',
    BIGCOMMERCE = 'BigCommerce',
    UNITY = 'Unity',
    C_SHARP = 'C#',
    VR = 'VR',
    GAME_DESIGN = 'Game Design',
    USER_RESEARCH = 'User Research',
    OCULUS = 'Oculus',
    STORYBOOK = 'Storybook',
}

const PROJECTS_LIST = [
    {
        primaryColor: '#594fff',
        name: 'PRAZ',
        websiteType: 'E-COMMERCE',
        image: '/images/praz-image.jpeg',
        logo: <PrazLogo />,
        tools: [
            Tools.MAGENTO,
            Tools.STORYBLOK,
            Tools.NEXTJS,
            Tools.SQUEEZELY,
            Tools.HEADLESS,
            Tools.GTM,
            Tools.SENTRY,
            Tools.STYLED_COMPONENTS,
        ],
        description: `
        
<div>
<p>
  PRAZ epitomizes dynamism and user-friendliness in the realm of online shopping, catering specifically to athletes and fitness enthusiasts by offering a rich array of high-quality sport meals meticulously tailored to their dietary requirements and performance aspirations. Whether you're a seasoned elite athlete in pursuit of optimal nutrition or a dedicated fitness enthusiast striving to power through workouts, PRAZ stands ready with a diverse selection of nutritious meals crafted to bolster your active lifestyle.
</p>
<p>
  Within the collaborative environment of Gracious, a vital arm of Happy Horizon, our team worked hand in hand to conceive and materialize the PRAZ website, ensuring an immersive and seamless online shopping experience for every customer. Employing state-of-the-art technologies and adhering to industry best practices, we transformed the vision of the PRAZ team into a captivating reality.
</p>
<p>
  The integration of Magento, Storyblok CMS, and Next.js was executed flawlessly, resulting in the delivery of a webshop that not only boasts a plethora of features but also exudes visual appeal synonymous with the esteemed PRAZ brand. From effortless browsing and purchasing of sport meals to accessing invaluable nutrition resources, the PRAZ website stands as a holistic solution catering to the discerning needs of athletes and fitness enthusiasts striving for premium nutrition and peak performance.
</p>
<p>
  But our commitment to innovation doesn't end there. With the implementation of Squeezely, powered by AI, we've taken personalization to new heights. By analyzing user click behavior, we deliver tailor-made product recommendations, ensuring that each customer finds the perfect meal to fuel their journey to greatness.
</p>
</div>
 
        `,
    },
    {
        primaryColor: '#c61717',
        name: 'Mr-fillet',
        websiteType: 'E-COMMERCE',
        image: '/images/mockups/mrfillet-mockup.jpg',
        tools: [Tools.MAGENTO, Tools.STORYBLOK, Tools.NEXTJS, Tools.GTM, Tools.HEADLESS, Tools.SENTRY],
        logo: <MrFilletLogo />,
    },
    // {
    //     primaryColor: '#09361b',
    //     name: 'Hillhout',
    //     websiteType: 'Configurator',
    //     image: '/images/vogels-image.png',
    //     logo: <HillhoutLogo />,
    // },
    {
        primaryColor: '#09361b',
        name: 'Methinks',
        websiteType: 'Website',
        image: '/images/vogels-image.png',
        tools: [Tools.MAGENTO, Tools.STORYBLOK, Tools.NEXTJS],
        logo: <HillhoutLogo />,
    },
    {
        primaryColor: '#ea5733',
        name: 'Vogels',
        websiteType: 'E-COMMERCE',
        image: '/images/mockups/vogels-mockup.jpg',
        tools: [
            Tools.MAGENTO,
            Tools.STORYBLOK,
            Tools.NEXTJS,
            Tools.REDIS,
            Tools.VUEJS,
            Tools.NODEJS,
            Tools.GOOGLE_PUBSUB,
            Tools.CLOUDFLARE,
            Tools.SENTRY,
            Tools.GTM,
        ],
        logo: <VogelsLogo />,
        description: `
        <div>
  <p>
    Vogel's is a leading provider of screen mounts, dedicated to enhancing your viewing experience with high-quality and versatile mounting solutions. Whether you're mounting a television, monitor, or projector, Vogel's offers a wide range of innovative products designed to meet your needs.
  </p>
  <p>
    Within Gracious (Part of Happy Horizon), we worked closely together to create a seamless online shopping experience for Vogel's customers. Leveraging cutting-edge technologies and best practices, we developed a webshop using Next.js with Magento integration, ensuring a secure and efficient platform for browsing and purchasing screen mounts.
  </p>
  <p>
    Additionally, to optimize content management, we developed a LinkPlugin app using Vue.js for Storyblok CMS. This custom app allows the client to easily select and manage links to products or categories from Magento, streamlining the process of updating website content and enhancing user navigation.
  </p>
  <p>
    Furthermore, to cater to a diverse audience, the website is available in 17 languages, providing a localized experience for customers around the world. This multi-language support ensures that Vogel's customers can access product information and make purchases in their preferred language, enhancing user engagement and satisfaction.
  </p>
  <p>
    Additionally, to enhance performance and streamline content delivery, I developed a Node script that efficiently stores page types into Redis. This solution eliminates the need to query all possible page types to determine what to show on the frontend, enhancing the speed and responsiveness of the website.
  </p>
  <p>
    We also implemented a Flatscreen Fitter tool, allowing users to select their screen size and brand to find compatible brackets effortlessly. This intuitive feature simplifies the selection process, ensuring that customers find the perfect mounting solution for their specific device.
  </p>
  <p>
    Additionally, we integrated a store locator functionality, enabling customers to easily find the nearest store to pick up their TV bracket. This convenient tool enhances accessibility and provides customers with a hassle-free way to obtain their desired mounting solution.
  </p>
</div>

            `,
    },
    {
        primaryColor: '#ffb914',
        name: 'SolarNRG',
        websiteType: 'CONFIGURATOR',
        image: '/images/solarnrg-image.jpeg',
        description: `
        <div>
        <p>
          Introducing our cutting-edge solar panel configurator, a game-changer for self-employed individuals seeking to harness the power of solar energy. Designed with simplicity and precision in mind, our configurator guides users through a series of intuitive questions, allowing them to tailor their solar panel order to their unique specifications.
        </p>
        <p>
          With just a few clicks, users can input crucial details such as roof type (flat or slanted), panel orientation, and desired quantity, empowering them to make informed decisions about their solar energy setup. Gone are the days of guesswork and uncertainty; our configurator ensures that every aspect of the order is carefully considered and optimized for maximum efficiency.
        </p>
        <p>
          Behind the scenes, our configurator leverages sophisticated algorithms to generate precise calculations and recommendations. What was once a complex Excel spreadsheet is now a seamless digital experience, thanks to our innovative approach to automation and customization.
        </p>
        <p>
          Central to our solution is an intuitive admin dashboard, providing clients with the tools they need to configure products and quantities effortlessly. With the power to fine-tune every aspect of their offerings, clients can ensure that their solar panel configurations meet the exact needs of their customers.
        </p>
        <p>
          Built with Next.js, Supabase, and Tailwind CSS, our configurator delivers a seamless user experience while leveraging the latest in web development technologies. Whether you're a seasoned solar industry veteran or a newcomer to renewable energy, our configurator makes the process of ordering solar panels a breeze.
        </p>
        <p>
          And with seamless integration into BigCommerce websites, our configurator seamlessly blends into your existing e-commerce platform, providing a cohesive and streamlined experience for both you and your customers.
        </p>
        <p>
          Join the ranks of forward-thinking self-employed individuals who are embracing solar energy with confidence. With our solar panel configurator by your side, the future of energy is brighter than ever.
        </p>
      </div>
        `,
        tools: [
            Tools.MAGENTO,
            Tools.STORYBLOK,
            Tools.NEXTJS,
            Tools.TAILWIND,
            Tools.SUPABASE,
            Tools.BIGCOMMERCE,
            Tools.REACT,
            Tools.SENTRY,
        ],
        logo: <SolarNRGLogo fill="#161414" />,
    },
    // {
    //     primaryColor: '#09361b',
    //     name: 'Hillhout',
    //     websiteType: 'Website',
    //     image: '/images/vogels-image.png',
    //     logo: <HillhoutLogo />,
    // },
    {
        primaryColor: '#fffced',
        name: 'Ainablers',
        websiteType: 'Website',
        image: '/images/mockups/ainablers-mockup.jpg',
        tools: [
            Tools.TAILWIND,
            Tools.STORYBLOK,
            Tools.ASTRO,
            Tools.GSAP,
            Tools.REACT,
            Tools.GTM,
            Tools.HEADLESS,
            Tools.SENTRY,
            Tools.PYTHON,
        ],
        description: `
        <div>
        <p>
          At Ainablers, we specialize in empowering businesses with cutting-edge AI solutions tailored to their unique needs. With a dedicated team of experts, including designers and developers, we collaborate closely with clients to implement AI technologies that drive innovation and efficiency in their operations.
        </p>
        <p>
          Our partnership with clients is exemplified in our project with Gracious (Part of Happy Horizon), where we seamlessly integrated AI functionalities into their online platform. Leveraging advanced technologies and industry best practices, we developed a dynamic and engaging website using Tailwind Astro with React, ensuring a modern and responsive user experience.
        </p>
        <p>
          To enhance interactivity and visual appeal, we utilized GSAP for dynamic animations, captivating users and guiding them through the website's content effortlessly. These animations not only add flair but also serve to highlight key features and benefits of the AI solutions offered by Ainablers.
        </p>
        <p>
          Additionally, to streamline content management and empower clients to easily update their website, we implemented Storyblok CMS. This powerful tool provides a user-friendly interface for content editing and organization, allowing clients to maintain their online presence with ease.
        </p>
        <p>
          Our commitment to excellence extends beyond technology implementation. We prioritize user experience and accessibility, ensuring that our AI solutions are intuitive and inclusive. Through collaborative design and development processes, we create solutions that resonate with users and drive tangible results for our clients.
        </p>
        <p>
          At Ainablers, we're not just building websites; we're transforming businesses with AI innovation. Join us on the journey to unlock the full potential of artificial intelligence and propel your business into the future.
        </p>
        </div>
        `,
        logo: <AinablersLogo fill="black" />,
    },
    {
        primaryColor: '#e57300',
        name: 'Lead Healthcare',
        websiteType: 'Website',
        image: '/images/leadhealthcare-image.png',
        tools: [Tools.MAGENTO, Tools.STORYBLOK, Tools.NEXTJS],
        logo: <LeadHealthcareLogo />,
    },
    {
        primaryColor: '#1a2b8f',
        name: 'Mobiel.nl',
        websiteType: 'E-COMMERCE',
        description: `
        <div>
        <p>
          Mobiel.nl is not just a platform for comparing phone subscriptions; it's a testament to the power of simplicity and choice in the world of telecommunications. With Mobiel.nl, navigating the maze of phone plans becomes a breeze, empowering users to find the perfect subscription tailored to their needs with ease.
        </p>
        <p>
          During my tenure of nearly three years at Mobiel.nl, I had the privilege of contributing to both the frontend and backend development as an in-house developer. Our journey was marked by innovation and dedication, as we continuously strived to enhance the user experience and deliver unparalleled value.
        </p>
        <p>
          One of our proudest achievements was the development of our own CMS system. This bespoke solution empowered us to manage content efficiently and tailor the platform to meet the evolving needs of our users. With the flexibility and control offered by our CMS, we were able to deliver a dynamic and engaging experience that set Mobiel.nl apart from the competition.
        </p>
        <p>
          In addition to frontend development, my role involved working closely with orders and backend systems responsible for managing orders and customer communication. This entailed developing robust backend solutions to handle order processing, inventory management, and customer interactions seamlessly.
        </p>
        <p>
          Our commitment to quality extended beyond development to every aspect of our operations. We leveraged tools such as Sentry for error monitoring and Jenkins for continuous integration and deployment to ensure the reliability and performance of our platform.
        </p>
        <p>
          Our tech stack was as diverse as it was powerful, encompassing technologies such as Ruby on Rails and Elixir for backend development, React and jQuery for frontend development, and a custom Chrome extension to enhance our colleagues convenience.
        </p>
        <p>
          At Mobiel.nl, our mission was clear: to empower users with choice, simplicity, and transparency in their phone subscription journey. With a focus on innovation, quality, and customer satisfaction, Mobiel.nl continues to redefine the landscape of telecommunications, one satisfied user at a time.
        </p>
      </div>
        `,
        image: '/images/mockups/mobielnl-mockup.jpg',
        tools: [
            Tools.RUBY,
            Tools.ELIXIR,
            Tools.REACT,
            Tools.STORYBOOK,
            Tools.GRAPHQL,
            Tools.CHROME_EXTENSION,
            Tools.SENTRY,
            Tools.JQUERY,
            Tools.JENKINS,
            Tools.STYLED_COMPONENTS,
            Tools.JQUERY,
        ],
        logo: <MobielLogo />,
    },
    {
        primaryColor: '#346FF6',
        name: 'SyncVR',
        websiteType: '2x VR Applications',
        image: '/images/mockups/syncvr-mockup.jpg',
        tools: [Tools.UNITY, Tools.C_SHARP, Tools.VR, Tools.GAME_DESIGN, Tools.USER_RESEARCH, Tools.OCULUS],
        description: `
        <div>
            <p>During my final internship at SyncVR, I had the opportunity to develop a VR application in Unity aimed at alleviating needle phobia, particularly in patients undergoing medical procedures involving injections. The application utilizes immersive virtual reality environments to distract and calm individuals during these moments of anxiety.</p>

            <p>The primary focus of the application was to create a serene and engaging experience for users, incorporating various relaxation tools such as soothing music, guided meditation sessions, and a tranquil forest setting where users could stroll peacefully. Feedback from patients indicated that these features were highly effective in reducing anxiety and enhancing their overall experience during medical procedures.</p>

            <p>Inspired by the success of this project, I decided to further explore the potential of VR technology in pediatric healthcare for my graduation assignment. I developed a tailored VR application specifically designed for children undergoing medical procedures involving injections. In this application, children engage in a playful game where they embark on an adventure to catch virtual animals while receiving their injection.</p>

            <p>To ensure the success of this project, extensive research was conducted to understand the preferences and interests of children. This informed the design and implementation of the game mechanics, ensuring that the experience would be engaging and enjoyable for young users while effectively distracting them during medical procedures.</p>

            <p>By combining the immersive capabilities of VR technology with thoughtful game design, this project aimed to provide children with a positive and empowering experience during potentially distressing medical procedures. It is my hope that this application will contribute to improving the overall healthcare experience for pediatric patients, making it more comfortable and less intimidating for them and their families.</p>
        </div>
        `,
        logo: <SyncVrLogo />,
    },
];

export default PROJECTS_LIST;
