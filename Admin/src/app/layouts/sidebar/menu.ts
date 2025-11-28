import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    // {
    //     id: 2,
    //     label: 'MENUITEMS.DASHBOARD.TEXT',
    //     icon: 'ph-gauge',
    //     subItems: [
    //         {
    //             id: 3,
    //             label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
    //             link: '/analytics',
    //             parentId: 2
    //         },
    //         {
    //             id: 4,
    //             label: 'MENUITEMS.DASHBOARD.LIST.CRM',
    //             link: '/crm',
    //             parentId: 2
    //         },
    //         {
    //             id: 5,
    //             label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
    //             link: '/',
    //             parentId: 2
    //         },
    //         {
    //             id: 6,
    //             label: 'MENUITEMS.DASHBOARD.LIST.LEARNING',
    //             link: '/learning',
    //             parentId: 2
    //         },
    //         {
    //             id: 7,
    //             label: 'MENUITEMS.DASHBOARD.LIST.REALESTATE',
    //             link: '/real-estate',
    //             parentId: 2
    //         }
    //     ]
    // },
    {
        id: 3,
        label: 'Inventario',
        icon: 'ph-package',
        subItems: [
            {
                id: 1,
                label: 'Lotes',
                link: '/inventario/lotes',
                parentId: 3
            }
        ]
    },
    // {
    //     id: 8,
    //     label: 'MENUITEMS.APPS.TEXT',
    //     isTitle: true
    // },
    // {
    //     id: 12,
    //     label: 'MENUITEMS.APPS.LIST.ECOMMERCE',
    //     icon: 'ph-storefront',
    //     parentId: 8,
    //     subItems: [
    //         {
    //             id: 13,
    //             label: 'MENUITEMS.APPS.LIST.PRODUCTS',
    //             link: '/ecommerce/products',
    //             parentId: 12
    //         },
    //         {
    //             id: 13,
    //             label: 'MENUITEMS.APPS.LIST.PRODUCTGRID',
    //             link: '/ecommerce/products-grid',
    //             parentId: 12
    //         },
    //         {
    //             id: 14,
    //             label: 'MENUITEMS.APPS.LIST.PRODUCTDETAILS',
    //             link: '/ecommerce/product-details',
    //             parentId: 12
    //         },
    //         {
    //             id: 15,
    //             label: 'MENUITEMS.APPS.LIST.CREATEPRODUCT',
    //             link: '/ecommerce/add-product',
    //             parentId: 12
    //         },
    //         {
    //             id: 16,
    //             label: 'MENUITEMS.APPS.LIST.ORDERS',
    //             link: '/ecommerce/orders',
    //             parentId: 12
    //         },
    //         {
    //             id: 17,
    //             label: 'MENUITEMS.APPS.LIST.ORDEROVERVIEW',
    //             link: '/ecommerce/order-overview',
    //             parentId: 12
    //         },
    //         {
    //             id: 18,
    //             label: 'MENUITEMS.APPS.LIST.CUSTOMERS',
    //             link: '/ecommerce/customers',
    //             parentId: 12
    //         },
    //         {
    //             id: 19,
    //             label: 'MENUITEMS.APPS.LIST.SHOPPINGCART',
    //             link: '/ecommerce/cart',
    //             parentId: 12
    //         },
    //         {
    //             id: 20,
    //             label: 'MENUITEMS.APPS.LIST.CHECKOUT',
    //             link: '/ecommerce/checkout',
    //             parentId: 12
    //         },
    //         {
    //             id: 21,
    //             label: 'MENUITEMS.APPS.LIST.SELLERS',
    //             link: '/ecommerce/sellers',
    //             parentId: 12
    //         },
    //         {
    //             id: 22,
    //             label: 'MENUITEMS.APPS.LIST.SELLEROVERVIEW',
    //             link: '/ecommerce/seller-overview',
    //             parentId: 12
    //         }
    //     ]
    // },
    // {
    //     id: 23,
    //     label: 'MENUITEMS.APPS.LIST.FILEMANAGER',
    //     icon: 'ph-folder-open',
    //     link: '/apps/file-manager',
    //     parentId: 8,
    // },
    // {
    //     id: 46,
    //     label: 'MENUITEMS.APPS.LIST.REALESTATE',
    //     icon: 'ph-buildings',
    //     parentId: 8,
    //     subItems: [
    //         {
    //             id: 47,
    //             label: 'MENUITEMS.APPS.LIST.LISTINGGRID',
    //             link: '/real-estate/grid',
    //             parentId: 46
    //         },
    //         {
    //             id: 48,
    //             label: 'MENUITEMS.APPS.LIST.LISTINGLIST',
    //             link: '/real-estate/list',
    //             parentId: 46
    //         },
    //         {
    //             id: 49,
    //             label: 'MENUITEMS.APPS.LIST.LISTINGMAP',
    //             link: '/real-estate/map',
    //             parentId: 46
    //         },
    //         {
    //             id: 50,
    //             label: 'MENUITEMS.APPS.LIST.PROPERTYOVERVIEW',
    //             link: '/real-estate/property-overview',
    //             parentId: 46
    //         },
    //         {
    //             id: 51,
    //             label: 'MENUITEMS.APPS.LIST.AGENT',
    //             parentId: 46,
    //             isCollapsed: true,
    //             subItems: [
    //                 {
    //                     id: 52,
    //                     label: 'MENUITEMS.APPS.LIST.LISTVIEW',
    //                     link: '/real-estate/agent/list',
    //                     parentId: 51
    //                 },
    //                 {
    //                     id: 53,
    //                     label: 'MENUITEMS.APPS.LIST.GRIDVIEW',
    //                     link: '/real-estate/agent/grid',
    //                     parentId: 51
    //                 },
    //                 {
    //                     id: 54,
    //                     label: 'MENUITEMS.APPS.LIST.OVERVIEW',
    //                     link: '/real-estate/agent/overview',
    //                     parentId: 51
    //                 },
    //             ]
    //         },
    //         {
    //             id: 55,
    //             label: 'MENUITEMS.APPS.LIST.AGENCIES',
    //             parentId: 46,
    //             isCollapsed: true,
    //             subItems: [
    //                 {
    //                     id: 56,
    //                     label: 'MENUITEMS.APPS.LIST.LISTVIEW',
    //                     link: '/real-estate/agencies/list',
    //                     parentId: 55
    //                 },
    //                 {
    //                     id: 57,
    //                     label: 'MENUITEMS.APPS.LIST.OVERVIEW',
    //                     link: '/real-estate/agencies/overview',
    //                     parentId: 55
    //                 },
    //             ]
    //         },
    //         {
    //             id: 58,
    //             label: 'MENUITEMS.APPS.LIST.ADDPROPERTY',
    //             link: '/real-estate/add-properties',
    //             parentId: 46
    //         },
    //         {
    //             id: 59,
    //             label: 'MENUITEMS.APPS.LIST.EARNINGS',
    //             link: '/real-estate/earnings',
    //             parentId: 46
    //         },
    //     ]
    // },
    // {
    //     id: 60,
    //     label: 'MENUITEMS.PAGES.TEXT',
    //     isTitle: true
    // },
    // {
    //     id: 75,
    //     label: 'MENUITEMS.EXTRAPAGES.TEXT',
    //     icon: 'ph-address-book',
    //     subItems: [
    //         {
    //             id: 76,
    //             label: 'MENUITEMS.EXTRAPAGES.LIST.STARTER',
    //             link: '/pages/starter',
    //             parentId: 75
    //         },
    //         {
    //             id: 77,
    //             label: 'MENUITEMS.EXTRAPAGES.LIST.PROFILE',
    //             link: '/pages/profile',
    //             parentId: 75,
    //         },
    //         {
    //             id: 78,
    //             label: 'MENUITEMS.EXTRAPAGES.LIST.PROFILESETTINGS',
    //             link: '/pages/profile-settings',
    //             parentId: 75,
    //         },
    //         {
    //             id: 79,
    //             label: 'MENUITEMS.EXTRAPAGES.LIST.CONTACTS',
    //             link: '/pages/contacts',
    //             parentId: 75
    //         },
    //         {
    //             id: 80,
    //             label: 'MENUITEMS.EXTRAPAGES.LIST.TIMELINE',
    //             link: '/pages/timeline',
    //             parentId: 75
    //         },
    //         {
    //             id: 81,
    //             label: 'MENUITEMS.EXTRAPAGES.LIST.FAQS',
    //             link: '/pages/faqs',
    //             parentId: 75
    //         }
    //     ]
    // }
]