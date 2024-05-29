import {publicAxios,privateReq} from "./axios-config";
function findGrowerGetLocation()
{
    return privateReq.get("/consumer/fetch-locations");

}

function findGrowersGetGrowers(obj)
{
    return privateReq.post("/consumer/fetch-growers",obj);
}

function findGrowerDoContactGrower(em)
{
    return privateReq.get("/consumer/contact-grower?em="+em);

}

function ConsumerProfileBtnSave(obj)
{
    return privateReq.post("/consumer/add-consumer-profile",obj);
}


function ConsumerProfileGetProfileData(emailString)
{
    return privateReq.get("/consumer/search-consumer-profile?email="+emailString);
}


function ConsumerProfileDoUpdateProfile(obj)
{
        return privateReq.post("/consumer/update-consumer-profile",obj)
}
export {findGrowerGetLocation,findGrowersGetGrowers,findGrowerDoContactGrower,ConsumerProfileBtnSave,ConsumerProfileGetProfileData,ConsumerProfileDoUpdateProfile};