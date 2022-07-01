const imgResponse = (urlList: any) => {
    var response = '<h1> <a href="/">Click to go to Home Page </a><br></h1><hr>'

    for (var i=0; i<urlList.length; i++){
     response+= `FILE URL: <a href="${urlList[i]}">${urlList[i]}</a>.<br> <br>`
     response+= `<img src="${urlList[i]}" /> <br> <hr>`
    }

    response+= `<br> <p>Now You Can Store This Url in Database</p>`
    return response
}