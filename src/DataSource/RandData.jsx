import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import Head from 'next/head'
import AttachMoney from '@mui/icons-material/AttachMoney';


export const SESSIONKEY = 'PLUMBERHOUSESESSION'
export const EXPENSEKEY = 'EXPENSEDATA'
export const INCOMEKEY = 'INCOMEDATA'
export const SUSPENDSALEKEY = 'SUSPENDEDDATA'
export const SUSPENDPURCHASEKEY = 'PURCHASEDATA'
export const ITEMSGRIDDATAKEY = 'ITEMSGRIDDATAKEY'
export const SUPPLIERDATAKEY = 'SUPPLIERDATAKEY'
export const CUSTOMERDATAKEY = 'CUSTOMERDATAKEY'
export const PURCHASEREPORTKEY = 'PURCHASEREPORTKEY'
export const SALEREPORTKEY = 'SALEREPORTKEY'
export const OTHERINCOMEKEY = 'OTHERINCOMEKEY'
export const OTHEREXPENSEKEY = 'OTHEREXPENSEKEY'
export const homeKey = 'HOMEDATAKEY'
export const USERSKEY = 'USERSGRIDKEY'
export const USERDATAKEY = 'USERDATAKEY'
export const THEMEDATA = 'THEMEDATA'

export const itemSchema = {
    itemName: '',
    pPrice: '',
    sPrice: '',
    qty: 0,

    stockOut: false,
    type: '',
    model: '',
    vendor: '',
    desc: '',
    itemAddedBy: '',
    itemID: 0
}

export const customerSchema = {
    customerID: 0,
    contactNo: '',
    customerName: '',
    address: '',
    customerAddedBy: '',
    customerType: '',
    description: ''
}
export const supplierSchema = {
    id: 0,
    contactNo: '',
    name: '',
    address: '',
    addedBy: '',
    type: '',
    desc: '',
    supplies: []
}
export const UsersAPI = { activeIndex: -1, users: [], unreadMsg: 0 }

export const NavBarData = [
    { link: '/', title: 'Home', icon: HomeIcon, type: ['Manager', 'Developer', 'Admin', ] },
    { link: '/dashboard', title: 'Dashboard', icon: DashboardIcon, type: ['Manager', 'Developer'], },
    { link: '/qoute', title: 'Qoute', icon: AttachMoney, type: ['Manager', 'Developer'], },
   
]

export const navbarDataLOGIN = { type: [], data: [] }

export const AppManifest = { name: 'Home Services', desc: 'Description', content: 'Created By KAMRAN' }

export const HeaderName = < Head >
    <
    title > { AppManifest.name } < /title> <
meta name = { AppManifest.desc }
content = { AppManifest.content }
/> < /
Head >

    export const userData = {
        fName: '',
        lName: '',
        username: '',
        email: '',
        password: '',
        confirmPass: '',
        address: '',
        userType: '',
        status: 'ACTIVE',
        userType: 'User',
        rights: []
    }

export const SHOPINFO = {
    name: 'Home Servicies',
    addressLine1: 'Home Services',
    addresLine2: 'United Kingdom',
    phone: '07882123610',
    email: 'h032448m@student.staffs.ac.uk',
    website: 'https://plumberhouse.herokuapp.com/',
    logo: { src: '/logo.jpg', alt: 'PB' },
    ico: { src: '/logo.ico', alt: 'signingBG' }
}

export function convert(str, add) {
    let dateStr = str
    if (add === undefined)
        add = 0
    if (dateStr === null) {
        dateStr = new Date()

    }
    dateStr = addDays(dateStr, add)
    var date = new Date(dateStr),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2),
        hrs = ("0" + date.getHours()).slice(-2),
        mins = ("0" + date.getMinutes()).slice(-2);
    return { date: [day, mnth, date.getFullYear()].join("-"), time: [hrs, mins].join(".") };
}

export const mainTheme = {
    mainBackground: 'linear-gradient(90deg, rgba(110, 137, 159, 0.6) 1%, rgba(110, 137, 159, 0.6) 41%, rgba(110, 137, 159, 0.5) 52%)',
    tabBackground: '#6e899f',
    text: '#F0FFFF',
    activeText: '#DEB6AB',
    tabText: '#F0FFFF',
    shadowText: '#888888',
    sidebar: '#4b6f8e',
    title: '#CFE8A9',
    up: '#50ff40',
    down: '#d77171',
    dark: '50%',
    icon: '#CDB99C',
    oppositeText: '#fff'
}
export const darkTheme = {
    mainBackground: '	#1e1e1e',
    tabBackground: 'rgba(60, 60, 60, 0.1)',
    text: '#F0FFFF',
    activeText: '#DEB6AB',
    tabText: '#F0FFFF',
    shadowText: '#888888',
    sidebar: '#262626',
    title: '#CFE8A9',
    up: '#50ff40',
    down: '#d77171',
    dark: '50%',
    icon: '#CDB99C',
    oppositeText: '#fff'
}
export const lightTheme = {
    mainBackground: '#ededed',
    tabBackground: '#e0e0e0',
    text: '#3D3D3D',
    activeText: '#333333',
    tabText: '#3D3D3D',
    shadowText: '#888888',
    sidebar: '#c6c6c6',
    title: '#134e6f',
    up: '#38761d',
    down: '#990000',
    dark: '20%',
    icon: '#765341',
    oppositeText: '#fff'
}

export const userType = ['User', 'Admin', 'Manager', 'Developer']

export const STATICID = 'KAMRAN-PLUMBER-HOUSE-ALI'