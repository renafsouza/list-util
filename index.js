var axios = require('axios');
var moment = require('moment')
var data = require('./data')


const searchByProtocol = async (protocol) => {
    var config = {
        method: 'get',
        url: `https://easynvestsupport.zendesk.com/api/v2/search.json?query=type:ticket tags:${protocol}`,
        headers: {
            'Authorization': 'Basic aW50ZWdyYWNhby11Ym90c0B1Ym90cy5jb20uYnIvdG9rZW46Y1NnaW9NcjlBU0tFZmRpcXZvTlkxMk15NlZSUUp5bHRmZjRadGd3Yg==',
            'Cookie': '_zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--459ed01949a36415c1716b5711271c3d08918307'
        }
    };

    return await axios(config)
        .then(function (response) {
            return response.data;
        });
}

const getSatisfactionRatings = async (url, score = "") => {
    var config = {
        method: 'get',
        url: `${url}${score}`,
        headers: {
            'Authorization': 'Basic aW50ZWdyYWNhby11Ym90c0B1Ym90cy5jb20uYnIvdG9rZW46Y1NnaW9NcjlBU0tFZmRpcXZvTlkxMk15NlZSUUp5bHRmZjRadGd3Yg==',
            'Cookie': '__cfruid=87187edf1e31d7cee8ff7419c599d27cc106eaea-1681741776; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--459ed01949a36415c1716b5711271c3d08918307'
        }
    };

    const data = await axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

    if (data.next_page) {
        return data.satisfaction_ratings.concat(await getSatisfactionRatings(data.next_page))
    } else {
        return data.satisfaction_ratings
    }
}

const convertDate = (date) => { return moment(date) }

const getAudits = async (ticket) => {

    var config = {
        method: 'get',
        url: `https://easynvestsupport.zendesk.com/api/v2/tickets/${ticket}/audits`,
        headers: {
            'Authorization': 'Basic aW50ZWdyYWNhby11Ym90c0B1Ym90cy5jb20uYnIvdG9rZW46Y1NnaW9NcjlBU0tFZmRpcXZvTlkxMk15NlZSUUp5bHRmZjRadGd3Yg==',
            'Cookie': '__cfruid=87187edf1e31d7cee8ff7419c599d27cc106eaea-1681741776; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--459ed01949a36415c1716b5711271c3d08918307'
        }
    };

    const { audits } = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    return audits;
}


const searchByEmail = async (email, closedAt) => {
    console.log(email)
    const closedAtFormated = moment(closedAt).format('YYYY-MM-DDTHH:mm:ss-03:00')
    var config = {
        method: 'get',
        // url: `https://easynvestsupport.zendesk.com/api/v2/search.json?query=type:ticket created>=${closedAtFormated} ${email}&sort_by=created_at&sort_order=ASC`,
        url: `https://easynvestsupport.zendesk.com/api/v2/search.json?query=type:ticket ${email}&sort_by=created_at&sort_order=ASC`,
        headers: {
            'Authorization': 'Basic aW50ZWdyYWNhby11Ym90c0B1Ym90cy5jb20uYnIvdG9rZW46Y1NnaW9NcjlBU0tFZmRpcXZvTlkxMk15NlZSUUp5bHRmZjRadGd3Yg==',
            'Cookie': '__cfruid=3dc8918ebc1e59fa8d1b9aebc9dffdccc0176035-1682601690; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--459ed01949a36415c1716b5711271c3d08918307'
        }
    };

    return axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}


const updateTicket = async (ticketId, status) => {
    var data = JSON.stringify({
        "ticket": {
            "status": status
        }
    });

    var config = {
        method: 'put',
        url: `https://easynvestsupport.zendesk.com/api/v2/tickets/${ticketId}`,
        headers: {
            'Authorization': 'Basic YnJ1bm9AdWJvdHMuY29tLmJyL3Rva2VuOnQ4RUk1YWJqUjNNenUyZnN6eVJSaWlaS3pSNWtjVkFKNENZMmZ1QWU=',
            'Content-Type': 'application/json',
            'Cookie': '_zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--459ed01949a36415c1716b5711271c3d08918307'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getData = async () => {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://api.meetime.com.br/v2/prospections/activities?limit=100&start=2700',
        headers: {
            'Authorization': 'EmPkUQnRVyMipdGx2fSCFL9gdsq4GZI6',
            'Content-Type': 'application/json'
        }
    };

    return axios(config)
        .catch(function (error) {
            console.log(error);
        });

}

const runAsync = async () => {
    for (let p = 0; ; p++) {
        const res = await getData(p * 100)
        for (a of res.data.data) {
            console.log(a)
        }
    }

    // for (ticket of data.tickets) {
    //     updateTicket(ticket, "open")
    //     updateTicket(ticket, "solved")
    // }
}

runAsync();