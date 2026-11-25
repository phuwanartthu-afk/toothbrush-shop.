// Google Apps Script: ผูกกับ Google Sheet (Extensions > Apps Script)
// 1) รันฟังก์ชัน setup() หนึ่งครั้งเพื่อสร้างชีต Products และ Orders
// 2) Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone
const ORDER_HEAD = ["OrderID","Timestamp","Name","Phone","Address","SKU","Product","Qty","Price","Total","Status"];

function setup(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let p = ss.getSheetByName("Products") || ss.insertSheet("Products");
  p.clear();
  p.getRange(1,1,3,6).setValues([
    ["SKU","Name","Price","Stock","Image","Desc"],
    ["TB-BAM-01","แปรงสีฟันไม้ไผ่ ขนนุ่ม",59,50,"images/bamboo-soft.svg","ด้ามไม้ไผ่ ย่อยสลายได้ ขนแปรงนุ่มไม่ระคายเหงือก"],
    ["TB-ELE-02","แปรงสีฟันไฟฟ้า Sonic",390,30,"images/sonic-electric.svg","สั่นสะเทือนระดับโซนิก ชาร์จ 1 ครั้งใช้ได้ 30 วัน"]
  ]);
  let o = ss.getSheetByName("Orders") || ss.insertSheet("Orders");
  if(o.getLastRow()===0) o.appendRow(ORDER_HEAD);
}

function rows_(name){
  const v = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name).getDataRange().getValues();
  const h = v.shift();
  return v.map(r => Object.fromEntries(h.map((k,i)=>[k.toString().toLowerCase()===k.toString()?k:k, r[i]])));
}
function json_(x){ return ContentService.createTextOutput(JSON.stringify(x)).setMimeType(ContentService.MimeType.JSON); }

function doGet(e){
  const a = e.parameter.action;
  if(a==="products"){
    return json_(rows_("Products").map(r=>({sku:r.SKU,name:r.Name,price:r.Price,stock:r.Stock,image:r.Image,desc:r.Desc})));
  }
  if(a==="orders") return json_(rows_("Orders"));
  return json_({error:"unknown action"});
}

function doPost(e){
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const o = ss.getSheetByName("Orders");
  if(d.action==="order"){
    const total = d.items.reduce((a,i)=>a+i.qty*i.price,0);
    d.items.forEach(i => o.appendRow([d.orderId,new Date(),d.name,"'"+d.phone,d.address,i.sku,i.name,i.qty,i.price,total,"new"]));
    return json_({ok:true,orderId:d.orderId});
  }
  if(d.action==="status"){
    const v = o.getDataRange().getValues();
    for(let r=1;r<v.length;r++) if(v[r][0]===d.orderId) o.getRange(r+1,11).setValue(d.status);
    return json_({ok:true});
  }
  return json_({error:"unknown action"});
}
