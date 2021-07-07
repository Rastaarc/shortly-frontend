export const APP_NAME= "Shortly"
export const DEVELOPED_BY = "Rastaarc"

export const USERTYPES = {
    ALL: 0,
    USER: 1,
    PUSER: 2,
    ADMIN: 3,
}

export const SCREEN_TYPES = {
    "LARGE_LAPTOP": 1,
    "LAPTOP": 2,
    "TABLET": 3,
    "MOBILE_LARGE": 4,
    "MOBILE_MEDIUM": 5,
    "MOBILE_SMALL": 6
}

export const ITEMS_PER_PAGE = 10;

export const MESSAGES = {
    FETCH_FAILED: "Failed to fetch your data. Please try again",
    FETCH_FAILED_ADMIN: "Failed to fetch the data. Please try again",
    DELETE_FAILED: "Failed to delete. Please try again",
    UPDATE_FAILED: "Failed to update. Please try again",
    NETWORK_ERROR: 'Request Failed. Network connection error'
}

export const META_GEN = (txt) => {
    const mtxt = `${txt} for Shortly. Shortly is a webapp created by Rastaarc(Rastaxarm - 08141161177) for both freemium and premium users to short their links`
    return mtxt
}
export const META = 'Shortly is a webapp created by Rastaarc(Rastaxarm - 08141161177) for both freemium and premium users to short their links'