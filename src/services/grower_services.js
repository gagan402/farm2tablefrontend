import {publicAxios,privateReq} from "./axios-config";

function itemsManagerFetchData(emailString)
{
    //  return publicAxios.get("grower/fetch-products?email="+emailString);
    return privateReq.get("/grower/fetch-products?email="+emailString);
}


function itemsManagerdoDelete(objId)
{
    return privateReq.get("/grower/delete-products?_id="+objId)
}


function availGrowerProductsDoPublish(obj)
{
    return privateReq.post("/grower/avail-products",obj)
}


function GrowerProfileBtnSave(obj)
{
    return privateReq.post("/grower/add-grower-profile",obj);
}


function GrowerProfileGetProfileData(emailString)
{
    return privateReq.get("/grower/search-grower-profile?email="+emailString);
}


function GrowerProfileDoUpdateProfile(obj)
{
        return privateReq.post("/grower/update-grower-profile",obj)
}
export {itemsManagerFetchData,itemsManagerdoDelete,availGrowerProductsDoPublish,GrowerProfileBtnSave,GrowerProfileGetProfileData,GrowerProfileDoUpdateProfile};