import { useEffect } from "react";
import image1 from "../Assets/home/image1.png";
import image2 from "../Assets/home/image2.png";
import image3 from "../Assets/home/image3.png";
import image4 from "../Assets/home/image4.png";
import Aos from "aos";
import "aos/dist/aos.css";
export const Home = () => {
  useEffect(() => {
    Aos.init();
  });
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A6CDC6] to-white text-black">
      <header className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold">Organize Your Tasks Efficiently</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Boost your productivity with our intuitive task management system.
          Plan, track, and complete your tasks effortlessly.
        </p>
      </header>

      <section
        className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div data-aos="fade-up" data-aos-duration="700">
          <h2 className="text-3xl font-semibold mb-4">
            Stay on Top of Your Work
          </h2>
          <p className="text-lg">
            Our task management app helps you manage your workflow seamlessly.
            With features like deadlines, priorities, and reminders, you’ll
            never miss a task again.
          </p>
        </div>
        <div
          className=" h-64 w-full rounded-lg"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <img src={image1} alt="" className="w-full object-contain h-64" />
        </div>
      </section>

      <section
        className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div
          className=" h-64 w-full rounded-lg"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <img src={image2} alt="" className="w-full object-contain h-64" />
        </div>
        <div data-aos="fade-up" data-aos-duration="700">
          <h2 className="text-3xl font-semibold mb-4">
            Seamless Collaboration
          </h2>
          <p className="text-lg">
            Collaborate with your team in real time. Assign tasks, set due
            dates, and track progress effortlessly, ensuring everyone stays on
            the same page.
          </p>
        </div>
      </section>

      <section
        className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div data-aos="fade-up" data-aos-duration="700">
          <h2 className="text-3xl font-semibold mb-4">
            Smart Reminders & Notifications
          </h2>
          <p className="text-lg">
            Never forget important deadlines with automated reminders. Our app
            ensures you stay updated with timely notifications tailored to your
            tasks.
          </p>
        </div>
        <div
          className=" h-64 w-full rounded-lg"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <img src={image3} alt="" className="w-full object-contain h-64" />
        </div>
      </section>

      <section
        className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div
          className=" h-64 w-full rounded-lg"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <img src={image4} alt="" className="w-full object-contain h-64" />
        </div>
        <div data-aos="fade-up" data-aos-duration="700">
          <h2 className="text-3xl font-semibold mb-4">Intuitive Dashboard</h2>
          <p className="text-lg">
            View your tasks in a clean and user-friendly dashboard. Customize
            your layout and organize your workload efficiently with ease.
          </p>
        </div>
      </section>

      <section className="text-center py-12" data-aos="fade-up">
        <h2 className="text-4xl font-semibold">
          Start Managing Your Tasks Today!
        </h2>
        <p className="mt-4 text-lg">
          Sign up now and take control of your productivity.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#468585] text-white rounded-lg text-lg">
          Get Started
        </button>
      </section>

      <footer className="bg-[#468585] text-white py-6 text-center">
        <p className="text-sm">
          &copy; 2025 Task Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
