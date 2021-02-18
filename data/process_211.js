/* script to process json data from ajax request at https://my211.force.com/s/service-directory?code=BD */
const fs = require('fs')
const csv = require('csv')

const data = fs.readFileSync(process.argv[2], 'utf8')
const rows= JSON.parse(data)

console.log(`Parsed ${rows.length} locations`)

const result = rows.map( row => {
    const v = [] 
    Object.keys(row.service).forEach( k => {
        if(k == 'Agency__r'){
            v[k +'__Name'] = row.service[k].Name
            v[k +'__Id'] = row.service[k].Id
        }else{
            v[k] = row.service[k]
        }
    })
    return v
})

const keys = Object.keys(result[0])

// map to list of lists in the same consistent key cols
const out_data = result.map( row => {
    const d = []
    keys.forEach( k => { d.push(row[k]) })
    return d
})
out_data.unshift(keys)

console.log(out_data[0])
console.log(out_data[1])


csv.stringify(out_data,function(err,output){
    console.log(`Writing csv to ${process.argv[3]}`)
    fs.writeFileSync(process.argv[3],output)
})