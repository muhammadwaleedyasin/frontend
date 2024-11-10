import { ActiveBoxesicon, ActiveHomeicon, ActiveUser, ActiveWalleticon, Boxesicon, Homeicon, User, Walleticon } from "@/svgs";
import house4 from '/public/assets/house4.svg';
import hotel from '/public/assets/hotel.svg';
import hotel2 from '/public/assets/hotel2.svg';

// data.js or SidebarData.js
export const SidebarData = {
    admin: [
        { name: 'Properties', src: '/dashboard/admin/properties', icon: <Homeicon />, activeIcon: <ActiveHomeicon /> },
        { name: 'Owners', src: '/dashboard/admin/owner', icon: <User />, activeIcon: <ActiveUser /> },
        { name: 'Users', src: '/dashboard/admin/user', icon: <User />, activeIcon: <ActiveUser /> },
        { name: 'Reservations', src: '/dashboard/admin/reservations', icon: <User />, activeIcon: <ActiveUser /> },
    ],
    user: [
        { name: 'Dashboard', src: '/dashboard/userdashboard/dashboard', icon: <Boxesicon />, activeIcon: <ActiveBoxesicon /> },
        { name: 'My Reservations', src: '/dashboard/userdashboard/rentproperties', icon: <Homeicon />, activeIcon: <ActiveHomeicon /> },
        { name: 'My Wish List', src: '/dashboard/userdashboard/wishlist', icon: <Walleticon />, activeIcon: <ActiveWalleticon /> },
    ],
    owner: [ // Ensure the key is lowercase if getRoleFromPath returns 'owner'
        { name: 'Dashboard', src: '/dashboard', icon: <Boxesicon />, activeIcon: <ActiveBoxesicon /> },
        { name: 'Rented Property', src: '/dashboard/properties', icon: <Homeicon />, activeIcon: <ActiveHomeicon /> },
        { name: 'My Wallet', src: '/dashboard/wallet', icon: <Walleticon />, activeIcon: <ActiveWalleticon /> },
    ]
};


export const cards = [
    {
        image: house4,
        title: 'Apartment Haus Gausteur',
        rating: '4.9/5',
        reviews: '50 Reviews',
        location: 'Sankht Glantrich, Austria',
        price: '€1580',
        id: 1,
        coordinates: [47.2692, 11.4041], // Example coordinates
    },
    {
        image: hotel,
        title: 'Apartment Haus Gausteur',
        rating: '4.9/5',
        reviews: '50 Reviews',
        location: 'Sankht Glantrich, Austria',
        price: '€1580',
        id: 2,
        coordinates: [47.2692, 11.4041], // Example coordinates
    },
    {
        image: hotel2,
        title: 'Apartment Haus Gausteur',
        rating: '4.9/5',
        reviews: '50 Reviews',
        location: 'Sankht Glantrich, Austria',
        price: '€2580',
        id: 3,
        coordinates: [47.2692, 11.4041], // Example coordinates
    },
    {
        image: house4,
        title: 'Apartment Haus Gausteur',
        rating: '4.9/5',
        reviews: '50 Reviews',
        location: 'Sankht Glantrich, Austria',
        price: '€3580',
        id: 4,
        coordinates: [47.2692, 11.4041], // Example coordinates
    },
    {
        image: hotel,
        title: 'Apartment Haus Gausteur',
        rating: '4.9/5',
        reviews: '50 Reviews',
        location: 'Sankht Glantrich, Austria',
        price: '€6580',
        id: 5,
        coordinates: [47.2692, 11.4041], // Example coordinates
    },
    {
        image: hotel2,
        title: 'Apartment Haus Gausteur',
        rating: '4.9/5',
        reviews: '50 Reviews',
        location: 'Sankht Glantrich, Austria',
        price: '€1580',
        id: 6,
        coordinates: [47.2692, 11.4041], // Example coordinates
    },
];





export const entertainmentOptions = [
    { name: 'cdPlayer', label: 'CD Player' },
    { name: 'computer', label: 'Computer' },
    { name: 'wifi', label: 'Wifi' },
    { name: 'radio', label: 'Radio' },
    { name: 'dvdPlayer', label: 'Blu-ray / DVD player' },
    { name: 'telephone', label: 'Telephone' },
    { name: 'satellite', label: 'Satellite / cable' },
    { name: 'tv', label: 'TV' }
];

export const tvLanguagesOptions = [
    { name: 'english', label: 'English' },
    { name: 'german', label: 'German' },
    { name: 'french', label: 'French' },
    { name: 'italian', label: 'Italian' },
    { name: 'russian', label: 'Russian' },
    { name: 'spanish', label: 'Spanish' },
    { name: 'local', label: 'Local' }
];



export const heatingAndAirConditioningOptions = [
    { name: 'centralHeating', label: 'Central heating' },
    { name: 'openFire', label: 'Open fire' },
    { name: 'airConditioning', label: 'Air conditioning' }
];

export const leisureOptions = [
    { name: 'gym', label: 'Gym' },
    { name: 'sauna', label: 'Sauna' },
    { name: 'tableTennis', label: 'Table tennis' },
    { name: 'jacuzzi', label: 'Jacuzzi' },
    { name: 'snookerPoolTable', label: 'Snooker / pool table' }
];
export const outdoorFacilitiesOptions = [
    { name: 'sharedPool', label: 'Shared pool' },
    { name: 'balcony', label: 'Balcony / terrace' },
    { name: 'garage', label: 'Garage' },
    { name: 'patioHeating', label: 'Patio heating' },
    { name: 'barbecue', label: 'Barbecue' },
    { name: 'outsideLightning', label: 'Outside lighting' },
    { name: 'privateGarden', label: 'Private garden' },
    { name: 'childrensPoolArea', label: 'Children\'s pool area' },
    { name: 'parking', label: 'Parking' },
    { name: 'seaView', label: 'Sea view' },
    { name: 'sharedGarden', label: 'Shared garden' },
    { name: 'tennisCourt', label: 'Tennis court' }
];
export const suitabilityOptions = [
    { name: 'children', label: 'Children' },
    { name: 'infants', label: 'Infants' },
    { name: 'smoking', label: 'Smoking' },
    { name: 'partiesAndEvents', label: 'Parties and events' },
    { name: 'restrictedMobility', label: 'Restricted mobility' },
    { name: 'pets', label: 'Pets' }
];



export const householdOptions = [
    { name: 'clothesDrier', label: 'Clothes drier' },
    { name: 'cooker', label: 'Cooker' },
    { name: 'crockery', label: 'Crockery' },
    { name: 'cutlery', label: 'Cutlery' },
    { name: 'dishwasher', label: 'Dishwasher' },
    { name: 'fridge', label: 'Fridge' },
    { name: 'freezer', label: 'Freezer' },
    { name: 'glassware', label: 'Glassware' },
    { name: 'hairDryer', label: 'Hair dryer' },
    { name: 'ironBoard', label: 'Iron / board' },
    { name: 'kettle', label: 'Kettle' },
    { name: 'microwave', label: 'Microwave' },
    { name: 'oven', label: 'Oven' },
    { name: 'potsPans', label: 'Pots / pans' },
    { name: 'toaster', label: 'Toaster' },
    { name: 'towelsLinen', label: 'Towels / linen' },
    { name: 'washingMachine', label: 'Washing machine' },
    { name: 'highChair', label: 'High chair' }
];