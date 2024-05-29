import {publicAxios} from "./axios-config";
function findGrowerGetLocation()
{
    return publicAxios.get("/consumer/fetch-locations");

}

function findGrowersGetGrowers(obj)
{
    return publicAxios.post("/consumer/fetch-growers",obj);
}

function findGrowerDoContactGrower(em)
{
    return publicAxios.get("/consumer/contact-grower?em="+em);

}

function ConsumerProfileBtnSave(obj)
{
    return publicAxios.post("/consumer/add-consumer-profile",obj);
}


function ConsumerProfileGetProfileData(emailString)
{
    return publicAxios.get("/consumer/search-consumer-profile?email="+emailString);
}


function ConsumerProfileDoUpdateProfile(obj)
{
        return publicAxios.post("/consumer/update-consumer-profile",obj)
}
export {findGrowerGetLocation,findGrowersGetGrowers,findGrowerDoContactGrower,ConsumerProfileBtnSave,ConsumerProfileGetProfileData,ConsumerProfileDoUpdateProfile};