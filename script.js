$(".calculator input").on("input change", function (event) {
  var parameterName =  $(this).attr("id").split("calc-")[1];
  var centimeters = $(this).val()
  
  switch (parameterName) {
    case "Cr":
      $("#calc-Cr_value").html("cᵣ: " + centimeters + " × 10‾⁸ m²/sec");
      break;
    case "depth":
      var m = $(this).val();
      $("#calc-depth_value").html("Depth: " + m + " m");
      break;
      case "mv":
        var m = $(this).val();
        $("#calc-mv_value").html("mᵥ: " + m + " m²/N");
        break;  
    case "Cz":
      $("#calc-Cz_value").html("cᵥ: " + $(this).val()+" × 10‾⁸ m²/sec");
      break;
    case "Settlement":
      $("#calc-Settlement_value").html("Allowed settlement after commencement of Construction: " + $(this).val() + " m");
      break;
      case "diameter":
      $("#calc-diameter_value").html("Diameter of PVDs: " + $(this).val() + " m");
      break;
    case "Settlementt":
      $("#calc-Settlementt_value").html("Time after which construction is to be started(in days): " + $(this).val() + " days");
      break;
    case "Settlementtt":
      $("#calc-Settlementtt_value").html("Area of Construction: " + $(this).val() + " m²");
      break;
    case "Loading":
      $("#calc-Loading_value").html("Average Loading: " + $(this).val() + " tonnes");
      break;
    // case "Time":
    //   $("#calc-days").html("Time after which construction is to be started(in days): " + $(this).val() + " hours per week");
    //   break;
    // case "Area of Construction  (in m²)":
    //   $("#calc-Area of Construction  (in m²)_value").html("Area of Construction  (in m²): " + $(this).val() + " hours per week");
    //   break;
  }
  
  var Cr = parseFloat($("#calc-Cr").val(), 10);
  var Cz = parseFloat($("#calc-Cz").val(), 10);
  var depth = parseFloat($("#calc-depth").val(), 10);
  var mv=parseFloat($("#calc-mv").val(), 10);
  var Loading = parseFloat($("#calc-Loading").val(), 10);
  var Settlement = parseFloat($("#calc-Settlement").val(), 10);
  var diameter = parseInt($("#calc-diameter").val(), 10);
  var time_for_construction = parseFloat($("#calc-Settlementt").val(), 10);
  var area= parseFloat($("#calc-Settlementtt").val(), 10);
  var value = $(".calculator input[name='value']:checked").val();
  
  // The Harris–Benedict equations revised by Mifflin and St Jeor in 1990: 'A new predictive equation for resting energy expenditure in healthy individuals'
  // var PVD = parseFloat(10 * depth + 6.25 * Cr - 5 * Cz, 10) + (value === " Triangle" ? 5 : -161);
  // PVD = PVD * 1.2* diameter*area;
  // PVD += Loading*60*(.03 * depth*1/0.45) / 7;
  // PVD += Settlement*60*(.07 * depth*1/0.45) / 7;
  // PVD = Math.floor(PVD);

  let pf=(mv*Loading*depth);
  let pt=pf-Settlement;
  let u=parseFloat((pt/pf)*100);
  let tv=Cz*time_for_construction/depth*depth;
  let uz=0.0;
  if(tv<0.287) 
  {
    uz=Math.sqrt((4*tv)/3.14);
  }
  else 
  {
    uz=100-Math.pow(10,(1.7813-tv)/0.9332);
  }
  
  let factor=parseFloat(value==="Triangle" ? 0.525:0.564);

 

 let k=Number.MAX_SAFE_INTEGER;
 let ans;
 for (let s = 0.01; s < 10; s=s+0.01) {
      // let s;
      let r=factor*s;
      let tr=(Cr*time_for_construction)/(8*r*r);
      let n1=r*2/diameter;

      let v=((n1*n1)*Math.log((n1/1.5)))/(n1*n1-2.25) -(3/4) + 2.25/(4*(n1*n1)) + (1.37*(n1*n1-2.25)*Math.log(1.5))/(n1*n1);

      let z=-(8*tr/v);
      let ur=1-Math.pow(2.71828,z);
      let ou=1-(1-uz)*(1-ur);
      if(u-ur<k)
      {
        ans=s;
        k=u-ur;
      }
 }

  var targetspacing = ans.toFixed(2);
  var targetpvdpoints = tv;
  var targetlength = tv;


  $("#calc-target-spacing span").html(targetspacing + "  m");
  $("#calc-target-pvdpoints span").html(targetpvdpoints + "  ");
  $("#calc-target-length span").html(targetlength + "  m");
  $("#test span").html(area + "  ");   
});