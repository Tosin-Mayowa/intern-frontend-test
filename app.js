const app=require('express')();
const products=require('./products')
const accessOrigin=require('./middleware/accessControl')
app.use(accessOrigin);

 app.get('/api/v1/products',(req,res)=>{
    let newProducts=products;
    const {search}=req.query;
    if(search){
        newProducts=newProducts.filter(prod=>prod.name.toLowerCase().indexOf(search.toLowerCase())!==-1)
    }
    if(newProducts.length===0){
       return res.json({success:true,data:[]})
    }
  return res.json({ success: true, data: newProducts, nbHits: newProducts.length });
})

app.listen(5000,()=>{
    console.log('listening on port 5000');
})