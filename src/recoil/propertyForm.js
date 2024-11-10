import { atom } from 'recoil';

export const propertyForm = atom({
    key: 'propertyForm',
    default: {
        propertytype:'',
        propertyRegion:{
            lat: 0.0,
            lng: 0.0
        },
        propertyPosition:{
            lat: 0.0,
            lng: 0.0
        },

        propertyDetails: {
            propertyName: '',
            country: '',
            region: '',
            address: '',
            zipCode: '',
            description: '',
            rating:''
        },
        roomDetails: {
            bathrooms: {
                enSuites: '1',
                separateWcs: '1',
            },
            bedrooms: [
                {
                    // bedroom: '',
                    noOfbeds: '1',
                    bedType: '',
                   
                },
            ],
            doubleSofaBeds: '',
            singleSofaBeds: '',
            singleFoldingBeds: '',
            cots: '',
            seats: {
                diningAreaSeats: '',
                livingAreaSeats: '',
            }
        },
        indoorFacilities: {
            entertainment: {
                cdPlayer: false,
                computer: false,
                wifi: false,
                radio: false,
                dvdPlayer: false,
                telephone: false,
                satellite: false,
                tv: false
            },
            tvLanguages: {
                english: false,
                german: false,
                french: false,
                italian: false,
                russian: false,
                spanish: false,
                local: false
            },
            heatingAndAirConditioning: {
                centralHeating: false,
                openFire: false,
                airConditioning: false,
                airConditioningType: ''
            },
            leisure: {
                gym: false,
                sauna: false,
                tableTennis: false,
                jacuzzi: false,
                snookerPoolTable: false
            },
            household: {
                clothesDrier: false,
                cooker: false,
                crockery: false,
                cutlery: false,
                dishwasher: false,
                fridge: false,
                freezer: false,
                glassware: false,
                hairDryer: false,
                ironBoard: false,
                kettle: false,
                microwave: false,
                oven: false,
                potsPans: false,
                toaster: false,
                towelsLinen: false,
                washingMachine: false,
                highChair: false
            }
        },

        outdoorFacilities: {
            privatePool: false,
            heating: {
                type: '',
                size: {
                    width: '',
                    height: ''
                },
                depth: {
                    min: '',
                    max: ''
                }
            },
            facilities: {
                sharedPool: false,
                balcony: false,
                garage: false,
                patioHeating: false,
                barbecue: false,
                outsideLightning: false,
                privateGarden: false,
                childrensPoolArea: false,
                parking: false,
                seaView: false,
                sharedGarden: false,
                tennisCourt: false
            },
            extraInformation: '',
            partofLeasureResort: false

        },
        suitability: {
            children: false,
            infants: false,
            smoking: false,
            partiesAndEvents: false,
            restrictedMobility: false,
            pets: false
        },

        checkDetails: {
            guests:1,
            unitId:0,
            unitDiscount:0,
            checkIn: {
                from: 'from',
                until: 'until'
            },
            checkOut: {
                from: 'from',
                until: 'until'
            },
            basePrice: {
                currency: "eur",
                price: ''
            },
            // seasonalPricing:[
            //    {
            //     dates:{
            //         from:'',
            //         until:''
            //     },
            //     nightlyPrice:'',
            //     minimumStay:'',
            //     acceptMultiple:''
            //    }
            // ]
            seasonalPricing: [],
        },
        placeImages: [],
        dateRange: {
            startingDate: '',
            endingDate: '',
        },
        unavailableDates:[]
    },
});
