import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

const TermsAndPrivacyPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'terms' | 'privacy'>('terms');
  
  return (
    <MainLayout title="Terms & Privacy - Paradox">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-400 mb-6 md:w-2/3">
            {activeTab === 'terms'
              ? 'Please read these terms carefully before using the Paradox platform.'
              : 'Learn how we collect, use, and protect your personal information.'}
          </p>
          
          {/* Tab Navigation */}
          <div className="flex mb-8 border-b border-indigo-800/50">
            <TabButton 
              active={activeTab === 'terms'} 
              onClick={() => setActiveTab('terms')}
            >
              Terms of Service
            </TabButton>
            <TabButton 
              active={activeTab === 'privacy'} 
              onClick={() => setActiveTab('privacy')}
            >
              Privacy Policy
            </TabButton>
          </div>
          
          <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6 md:p-8">
            {activeTab === 'terms' ? (
              <TermsContent />
            ) : (
              <PrivacyContent />
            )}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`py-3 px-6 font-medium transition ${
      active
        ? 'border-b-2 border-purple-500 text-white'
        : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const TermsContent: React.FC = () => (
  <div className="prose prose-invert max-w-none">
    <p className="text-gray-300">
      Last Updated: September 15, 2023
    </p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>
      By accessing or using the Paradox platform, website, and services (collectively referred to as the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you may not access or use the Service.
    </p>
    
    <h2>2. Changes to Terms</h2>
    <p>
      Paradox reserves the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
    </p>
    
    <h2>3. Account Registration</h2>
    <p>
      To access certain features of the Service, you may be required to register for an account. You must provide accurate, current, and complete information during the registration process and keep your account information updated. You are responsible for safeguarding your password and for all activities that occur under your account.
    </p>
    
    <h2>4. User Content</h2>
    <p>
      Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the Service, including its legality, reliability, and appropriateness.
    </p>
    <p>
      By posting User Content on or through the Service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service. You retain any and all of your rights to any User Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
    </p>
    
    <h2>5. Paradox Coins and Purchases</h2>
    <p>
      The Service may include a virtual currency called "Paradox Coins" that can be purchased for real money or earned through activities on the platform. Paradox Coins are not redeemable for real money or monetary value from us. You acknowledge that you do not own Paradox Coins, but rather have a limited, non-transferable, revocable license to use them within the Service.
    </p>
    <p>
      All purchases through the Service are final and non-refundable, except as required by applicable law. We reserve the right to modify, manage, control and/or eliminate Paradox Coins at our sole discretion.
    </p>
    
    <h2>6. Truth Fragments</h2>
    <p>
      "Truth Fragments" are digital collectibles within the Service that can be discovered, earned, or obtained through various means. Truth Fragments are not redeemable for real money and are governed by the same license terms as Paradox Coins.
    </p>
    
    <h2>7. Intellectual Property</h2>
    <p>
      The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of Paradox and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Paradox.
    </p>
    
    <h2>8. Termination</h2>
    <p>
      We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
    </p>
    <p>
      If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
    </p>
    
    <h2>9. Limitation of Liability</h2>
    <p>
      In no event shall Paradox, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
    </p>
    
    <h2>10. Disclaimer</h2>
    <p>
      Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
    </p>
    
    <h2>11. Governing Law</h2>
    <p>
      These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
    </p>
    
    <h2>12. Contact Us</h2>
    <p>
      If you have any questions about these Terms, please contact us at <a href="mailto:legal@paradox-world.com" className="text-purple-400 hover:text-purple-300">legal@paradox-world.com</a>.
    </p>
  </div>
);

const PrivacyContent: React.FC = () => (
  <div className="prose prose-invert max-w-none">
    <p className="text-gray-300">
      Last Updated: September 15, 2023
    </p>
    
    <h2>1. Introduction</h2>
    <p>
      This Privacy Policy explains how Paradox ("we," "our," or "us") collects, uses, shares, and protects your personal information when you use our platform, website, and services (collectively referred to as the "Service").
    </p>
    <p>
      By using the Service, you consent to the collection, use, disclosure, and procedures this Privacy Policy describes. Beyond the Privacy Policy, your use of our Service is also subject to our <Link href="/terms" className="text-purple-400 hover:text-purple-300">
        <span onClick={() => window.scrollTo(0, 0)}>Terms of Service</span>
      </Link>.
    </p>
    
    <h2>2. Information We Collect</h2>
    
    <h3>2.1 Information You Provide to Us</h3>
    <p>
      We collect information you provide directly to us when you:
    </p>
    <ul>
      <li>Create an account (name, email address, username, password)</li>
      <li>Complete your profile (bio, profile picture)</li>
      <li>Make purchases (payment information, billing details)</li>
      <li>Communicate with us (email communications, support requests)</li>
      <li>Post content in our community areas</li>
      <li>Participate in surveys or promotions</li>
    </ul>
    
    <h3>2.2 Information We Collect Automatically</h3>
    <p>
      When you use our Service, we automatically collect certain information, including:
    </p>
    <ul>
      <li>Device information (device type, operating system, unique device identifiers)</li>
      <li>Log information (IP address, browser type, pages viewed, time spent on pages)</li>
      <li>Game play information (progress, choices, achievements, time spent)</li>
      <li>Location information (general location based on IP address)</li>
      <li>Cookies and similar technologies (as described in our Cookie Policy)</li>
    </ul>
    
    <h2>3. How We Use Your Information</h2>
    <p>
      We use the information we collect to:
    </p>
    <ul>
      <li>Provide, maintain, and improve the Service</li>
      <li>Process transactions and send related information</li>
      <li>Send technical notices, updates, and support messages</li>
      <li>Respond to your comments and questions</li>
      <li>Personalize your experience and provide content recommendations</li>
      <li>Monitor and analyze trends, usage, and activities</li>
      <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
      <li>Protect the rights and property of Paradox and others</li>
    </ul>
    
    <h2>4. How We Share Your Information</h2>
    <p>
      We may share your information in the following circumstances:
    </p>
    <ul>
      <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
      <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process</li>
      <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Paradox or others</li>
      <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
      <li>With your consent or at your direction</li>
    </ul>
    <p>
      We may also share aggregated or de-identified information, which cannot reasonably be used to identify you.
    </p>
    
    <h2>5. Your Choices</h2>
    <p>
      You have several choices regarding your information:
    </p>
    <ul>
      <li><strong>Account Information:</strong> You can update your account information through your account settings.</li>
      <li><strong>Promotional Communications:</strong> You can opt out of receiving promotional emails by following the instructions in those emails.</li>
      <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies.</li>
      <li><strong>Do Not Track:</strong> Some browsers offer a "Do Not Track" feature. We currently do not respond to Do Not Track signals.</li>
    </ul>
    
    <h2>6. Data Retention</h2>
    <p>
      We store the information we collect about you for as long as is necessary for the purpose(s) for which we originally collected it. We may retain certain information for legitimate business purposes or as required by law.
    </p>
    
    <h2>7. Children's Privacy</h2>
    <p>
      The Service is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe we might have any information from or about a child under 13, please contact us.
    </p>
    
    <h2>8. Changes to this Privacy Policy</h2>
    <p>
      We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice. We encourage you to review the Privacy Policy whenever you access the Service.
    </p>
    
    <h2>9. Contact Us</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@paradox-world.com" className="text-purple-400 hover:text-purple-300">privacy@paradox-world.com</a>.
    </p>
  </div>
);

export default TermsAndPrivacyPage; 