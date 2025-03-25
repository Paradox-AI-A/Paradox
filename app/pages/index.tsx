import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import Logo from '../components/common/Logo';

// 定义组件 props 接口
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

interface StoryCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

interface CommunityCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  delay?: number;
}

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
                    Paradox:
                  </span>{' '}
                  The Story You Must{' '}
                  <span className="text-red-500">Lie</span> to Complete
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Immerse yourself in a narrative experience where truth is subjective,
                  and sometimes a carefully crafted lie is the only path to deeper understanding.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-medium transition"
                  >
                    Begin Your Journey
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-3 rounded-md border border-purple-600 text-purple-400 hover:bg-purple-900/30 font-medium transition"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 to-transparent rounded-full blur-xl"></div>
                <Logo width={400} height={400} className="relative z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black/40 backdrop-blur-sm rounded-xl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The World of Paradox</h2>
            <p className="text-lg text-gray-300">
              In 2050, society is divided between the Truth Covenant, who control the global information
              order, and the Paradox Resistance, who've discovered flaws in their Truth AI.
              Your journey as Ela Chen begins when you discover your rare ability to lie
              without detection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Truth vs. Lie"
              description="Explore a world where absolute truth is enforced by AI, and your ability to lie becomes your most powerful tool for discovering deeper truths."
              icon="🔍"
              delay={0.1}
            />
            <FeatureCard
              title="Paradox Coins"
              description="Earn digital assets whose values fluctuate based on your choices and the collective paradox resolution rate of all players."
              icon="💰"
              delay={0.3}
            />
            <FeatureCard
              title="Truth Fragments"
              description="Collect unique NFTs that evolve as you progress, combine to create new insights, and unlock hidden story content."
              icon="🧩"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Journey Awaits</h2>
            <p className="text-lg text-gray-300">
              Follow Ela's path from discovery to rebellion through three immersive chapters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StoryCard
              title="Awakening"
              description="Discover your unique ability to lie without detection and make first contact with the Resistance."
              image="/images/chapter-awakening.jpg"
              delay={0.1}
            />
            <StoryCard
              title="Training"
              description="Master the art of paradox construction and prepare to infiltrate the Truth Covenant."
              image="/images/chapter-training.jpg"
              delay={0.3}
            />
            <StoryCard
              title="Subversion"
              description="Challenge the Truth AI system and fight to reveal the reality hidden beneath layers of enforced truth."
              image="/images/chapter-subversion.jpg"
              delay={0.5}
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/stories"
              className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-medium transition"
            >
              Explore All Stories
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black/40 backdrop-blur-sm rounded-xl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Community</h2>
            <p className="text-lg text-gray-300">
              Paradox is more than a story—it's a collective exploration of truth, lies, and the space between.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CommunityCard
              title="Truth Market"
              description="Exchange clues and strategies with other players."
              icon="🏛️"
              href="/truth-market"
              delay={0.1}
            />
            <CommunityCard
              title="Lie Arena"
              description="Compete to see whose lie is more convincing."
              icon="⚔️"
              href="/lie-arena"
              delay={0.2}
            />
            <CommunityCard
              title="Paradox Academy"
              description="Learn advanced lying techniques from experienced players."
              icon="🎓"
              href="/paradox-academy"
              delay={0.3}
            />
            <CommunityCard
              title="Truth Council"
              description="Vote on new story directions and feature development."
              icon="⚖️"
              href="/truth-council"
              delay={0.4}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

// Helper components for the homepage
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-indigo-950/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/30 hover:border-purple-700/50 transition"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const StoryCard: React.FC<StoryCardProps> = ({ title, description, image, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="group bg-indigo-950/40 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-900/20 transition"
  >
    <div className="h-48 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent opacity-60 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition duration-500"
        style={{ backgroundImage: `url(${image || '/images/placeholder.jpg'})` }}
      ></div>
      <div className="absolute bottom-0 left-0 p-4 z-20">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </div>
    <div className="p-4">
      <p className="text-gray-400">{description}</p>
      <Link href={`/stories/${title.toLowerCase()}`} className="text-purple-400 mt-3 inline-block hover:text-purple-300 transition">
        Begin Chapter &rarr;
      </Link>
    </div>
  </motion.div>
);

const CommunityCard: React.FC<CommunityCardProps> = ({ title, description, icon, href, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <Link
      href={href}
      className="block h-full bg-indigo-950/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/30 hover:border-purple-700/50 hover:bg-indigo-900/30 transition"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </Link>
  </motion.div>
);

export default HomePage; 