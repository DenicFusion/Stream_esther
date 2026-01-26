// GLOBAL CONFIGURATION

// Theme Color: 'BLUE' (Cyan/Blue) or 'GREEN' (Emerald/Green)
export const THEME_COLOR: 'BLUE' | 'GREEN' = 'BLUE';

// Payment Modes: 'TRUE' (Paystack), 'FALSE' (Transfer), 'NEUTRAL' (Transfer + Opay)
export const PAYMENT_MODE: 'TRUE' | 'FALSE' | 'NEUTRAL' = 'FALSE';

// If true, user goes to Dashboard (Demo Mode) after signup. 
// If false, user goes directly to Payment page.
export const SHOW_DASHBOARD_BEFORE_PAYMENT = false;

// Payment Timer Duration (in minutes) for Manual Transfer
export const PAYMENT_TIMER_MINUTES = 30;

// Admin Support Configuration
export const SUPPORT_CONTACT = {
  showOnHome: true, // Show FAB on homepage
  method: 'WHATSAPP' as 'WHATSAPP' | 'TELEGRAM', // Toggle between 'WHATSAPP' and 'TELEGRAM'
  whatsappNumber: "2349012345678", 
  telegramUrl: "https://t.me/streamafrica_official"
};

// Opay Configuration
// TEST/SANDBOX KEY provided
export const OPAY_PUBLIC_KEY = "OPAYPUB17691774750010.6524153887502064";

// IMPORTANT: Your actual OPay Merchant ID
export const OPAY_MERCHANT_ID = "281826012352775"; 

// Using Sandbox URL for testing since we are using a Test Key
export const OPAY_API_URL = "https://sandboxapi.opaycheckout.com/api/v1/international/cashier/create";
;

// Bank Details
export const BANK_DETAILS = [
  {
    bankName: "OPAY",
    accountNumber: "7066617981",
    accountName: "MUSA ESTHER"
  },
  // Add second account here if needed for dual accounts
  {
    bankName: "PAGA", 
    accountNumber: "3244891292",
    accountName: "MUSA ESTHER"
  }
];

export const MOCK_NAMES = [
  "Chinedu A.", "Sarah K.", "Emmanuel O.", "Zainab B.", "David I.", "Ngozi E.", 
  "Tunde B.", "Fatima Y.", "Kofi M.", "Amara U.", "Blessing J.", "Samuel T.",
  "Grace P.", "Ibrahim S.", "Chioma N.", "Femi A.", "Yusuf D.", "Kehinde L.",
  "Adebayo O.", "Mary J.", "Gideon F.", "Victoria R.", "Emeka C.", "Joy H.",
  "Paul K.", "Esther M.", "Daniel W.", "Ruth B.", "Isaac N.", "Peace O.",
  "Michael A.", "Gloria E.", "Solomon T.", "Faith S.", "Joshua L.", "Mercy D.",
  "Kingsley U.", "Patience K.", "Matthew J.", "Charity A.", "Joseph B.", "Deborah F.",
  "Anthony G.", "Rebecca H.", "Francis I.", "Elizabeth J.", "Gabriel K.", "Hannah L.",
  "Elijah M.", "Jennifer N.", "Victor O.", "Sharon P.", "Raphael Q.", "Theresa R.",
  "Simon S.", "Angela T.", "Timothy U.", "Brenda V.", "Uche W.", "Linda X.",
  "Stanley Y.", "Rose Z.", "Benjamin A.", "Clara B.", "Caleb C.", "Doris D.",
  "Ezekiel E.", "Felicia F.", "Godwin G.", "Helen H.", "Harrison I.", "Irene J.",
  "Jeremiah K.", "Juliet L.", "Kelvin M.", "Kate N.", "Lawrence O.", "Lilian P.",
  "Moses Q.", "Monica R.", "Nathan S.", "Naomi T.", "Oliver U.", "Olivia V.",
  "Patrick W.", "Priscilla X.", "Quincy Y.", "Queen Z.", "Richard A.", "Rachel B.",
  "Stephen C.", "Stella D.", "Thomas E.", "Tina F.", "Valentine G.", "Vivian H.",
  "William I.", "Wendy J.", "Xavier K.", "Yvonne L.", "Zachary M.", "Zoe N."
];
