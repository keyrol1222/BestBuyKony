//Type your code here
function CallServiceLocation(callConfig,mapWidget){ 
  kony.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

  const serviceName = "BestBuyServiceKeyrol";
  const client = kony.sdk.getCurrentInstance(); 
  const service = client.getIntegrationService(serviceName);

  service.invokeOperation(callConfig.operationName, callConfig.headers, callConfig.params,
                          operationSuccess, operationFailure);


  //succes service call
  function operationSuccess(res){    
    const Cities = MapDataLocation(res,mapWidget)
    if(Cities.length > 0){

      //             mapWidget.addPin(Cities[0])
      currentPins.push(...Cities)
      AddPinsToMap(currentPins,mapWidget) 


    }

  }
  //fail to call service 
  function operationFailure(res){ 
    kony.application.dismissLoadingScreen();

    alert('failure in call');

  }


} 

function MapDataLocation(res,mapWidget){ 
  const CityMappedArray = []
  if(res.stores.length > 0) {

    res.stores.map((city,i) =>{  
      if(city.lat && city.lng){
        CityMappedArray.push({
          'id': city.storeId,
          'lat': city.lat,
          'lon': city.lng,
          'name': city.name,
          'desc': city.hours,
          'showCallout' : true,
          'calloutData' : {
            'lblName':{'text':  city.name},
            'LblAddress':{'text': city.address},
            'LblHours':{'text': city.hours},
            'ImgNav':{
              'src': 'compass.png'
            }
          },
          'template': 'FlxMainMap'

        }) 
      }

    }) 
  }
  else{
    alert('Wrong city name, pls try again') 
  }
  kony.application.dismissLoadingScreen(); 

  return CityMappedArray

} 
