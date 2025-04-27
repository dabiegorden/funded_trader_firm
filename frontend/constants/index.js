import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubHeroSection from "@/components/SubHeroSection";
import GetFunded from "@/components/GetFunded";
import CustomGetFundedBtn from "@/components/CustomGetFundedBtn";
import EquityEdge from "@/components/EquityEdge";
import FundingOptionsSection from "@/components/FundingOptionsSection";
import TradingPlanSelector from "@/components/TradingPlanSelector";
import PayoutCertificatesCarousel from "@/components/PayoutCertificatesCarousel ";
import ProveWorthySection from "@/components/ProveWorthySection";
import TelegramCommunityBenefits from "@/components/TelegramCommunityBenefits";
import ContactForm from "@/components/ContactForm";
import TradeEliteBanner from "@/components/TradeEliteBanner";
import EquityEdgePayout from "@/components/EguityEdgePayout";
import Footer from "@/components/Footer";

export {
    Navbar,
    Hero,
    SubHeroSection,
    GetFunded,
    CustomGetFundedBtn,
    EquityEdge,
    FundingOptionsSection,
    TradingPlanSelector,
    PayoutCertificatesCarousel,
    ProveWorthySection,
    TelegramCommunityBenefits,
    ContactForm,
    TradeEliteBanner,
    EquityEdgePayout,
    Footer
}


export const navbarLinks = [
    {
        id: 1,
        name: "Home",
        route: "/"
    },
    {
        id: 2,
        name: "Pricing",
        route: "/pricing"
    },
    {
        id: 3,
        name: "Affiliate",
        route: "/affiliate"
    },
    {
        id: 4,
        name: "FAQ",
        route: "/faq"
    },
    {
        id: 5,
        name: "Contact",
        route: "/contact-us"
    },
]

// stats
export const steps = [
    {
      number: "01",
      title: "Prove Your Trading Edge",
      description: "Showcase your trading skill, discipline, and consistency by meeting the profit targets outlined in our Instant Funding or 1-Step Challenge Unlock the opportunity to trade with our capital and take your trading career to the next level.",
      color: "bg-green-950" // Dark green for first step
    },
    {
      number: "02",
      title: "Complete Verification",
      description: "Once you successfully achieve your profit targets, the next step in the process is identity verification, commonly referred to as KYC (Know Your Customer). This essential step ensures compliance, security, and a seamless transition toward managing your funded account",
      color: "bg-green-600" // Medium green for second step
    },
    {
      number: "03",
      title: "Get Funded",
      description: "You will now get your Funded account details and start generating commissions from all of your simulated profits, earning up to 80% split on all net simulated profits that you generate on your account",
      color: "bg-green-400" // Lighter green for third step
    }
  ];


//   Equity features sections
import { Calendar, Target, ArrowUpRight, DollarSign, Users, Ban, LineChart, CalendarDays, RefreshCw } from 'lucide-react';
  export const featuresData = [
    {
      title: "Why Should You Join Equity Edge",
      features: [
        {
          icon: <Ban className="w-8 h-8 text-white" />,
          title: "Trade Your Way",
          description: "Hold positions during news, keep trades over the weekend, and trade with lot sizes as large as your leverage allows. Flexibility at your fingertips!"
        },
        {
          icon: <CalendarDays className="w-8 h-8 text-white" />,
          title: "Unlimited Trading Days",
          description: "...Hence, we let our traders pass our challenges at their own pace."
        },
        {
          icon: <RefreshCw className="w-8 h-8 text-white" />,
          title: "Industry Best Profit Share",
          description: "Your success is our success. We understand and value your hard work and dedication with up to a 90% profit split."
        }
      ]
    },
    {
      title: "Our Trading Benefits",
      features: [
        {
          icon: <Target className="w-8 h-8 text-green-500" />,
          title: "Lowest Profit Target",
          description: "We empower our traders to achieve their trading goals efficiently and effectively."
        },
        {
          icon: <DollarSign className="w-8 h-8 text-green-500" />,
          title: "Lowest Commissions & Spreads",
          description: "Trade like a pro by taking advantage of our super-tight spreads."
        },
        {
          icon: <Users className="w-8 h-8 text-green-500" />,
          title: "High Referral Commissions",
          description: "Your efforts deserve recognition. Refer Equity Edge to your friends and family and earn commissions."
        }
      ]
    },
    {
      title: "Monthly Competitions",
      features: [
        {
          icon: <Calendar className="w-12 h-12 text-green-500 mx-auto" />,
          title: "Rewarding Monthly Competitions",
          description: "Participate in our monthly free trading competitions and get a chance to prove your trading skills.",
          cta: true
        }
      ]
    }
  ];

// Telegram Benefits
import { Brain, Trophy, HeadphonesIcon} from 'lucide-react';
export const benefits = [
  {
    Icon: Brain,
    title: 'Trading Mindset',
    description: 'Develop the right mindset to succeed in trading with insights and tips from Fortune Edge Funding’s experts.',
  },
  {
    Icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Get round-the-clock support from our team to help you navigate your trading journey with Fortune Edge Funding.',
  },
  {
    Icon: LineChart,
    title: 'Market Insights',
    description: 'Access daily market analysis, trading strategies, and exclusive content tailored for Fortune Edge traders.',
  },
];