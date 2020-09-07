const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
var randomize = require('randomatic')
var random = require('random-name')
const { URLSearchParams } = require('url');
const cheerio = require('cheerio');
const rp = require('request-promise');
const ethWallet = require('ethereumjs-wallet');
const fs = require('fs-extra');
const delay = require('delay');
const { read } = require('fs');
const { config } = require('process');

const functionRegist = (username, nomor, reff) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('username', username);
    params.append('pwd', 'Kmaway87aaa@')
    params.append('tel', `851${nomor}`)
    params.append('code', '')
    params.append('agentid', reff)

       fetch('https://api.x898xe.fun/api/login/register', {
        method: 'POST', 
        body: params,
        headers: {
            'Host': 'api.x898xe.fun',
            'Accept': '*/*',
            'language': 'en-US',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://home.x898xe.fun',
            //Referer: 'https://home.x898xe.fun/agentid/25333',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
           }
       })
       .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionLogin = (username) => new Promise((resolve, reject) => {
    const bodys = {
        username: username,
        password: "Kmaway87aaa@",
        devicetype: "android",
        version: 100
    }

       fetch('https://api.x898xe.fun/api/login/login', {
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'language': 'ina-BA',
            'token': '',
            'user-agent': 'Redmi Note 9 Pro(Android/10) (com.spsd.st/1.0.4) Weex/0.26.0 1080x2170',
            'Content-Type': 'application/json; charset=utf-8',
            //Content-Length: 83
            'Host': 'api.x898xe.fun',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
           }
       })
       .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionOrder = (token) => new Promise((resolve, reject) => {

       fetch('https://api.x898xe.fun/api/order/mkorder', {
        method: 'POST', 
        headers: {
            'language': 'ina-BA',
            'token': token,
            'user-agent': 'Redmi Note 9 Pro(Android/10) (com.spsd.st/1.0.4) Weex/0.26.0 1080x2170',
            'Content-Type': 'application/json; charset=utf-8',
            //Content-Length: 83
            'Host': 'api.x898xe.fun',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
           }
       })
       .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionConfirm = (orderId, token) => new Promise((resolve, reject) => {
    const bodys = {
        orderid: orderId, 
        status: 1
    } 

       fetch('https://api.x898xe.fun/api/order/confirm', {
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'language': 'ina-BA',
            'token': token,
            'user-agent': 'Redmi Note 9 Pro(Android/10) (com.spsd.st/1.0.4) Weex/0.26.0 1080x2170',
            'Content-Type': 'application/json; charset=utf-8',
            //Content-Length: 83
            'Host': 'api.x898xe.fun',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
           }
       })
       .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionAlamat = (token) => new Promise((resolve, reject) => {
    const bodys = {
        isdefault:1,
        realname: "Sjjsjxx",
        telephone: "085155157425",
        region: "Bekasi",
        detail: "Aknxkwjsjxjskakzkzksw",
        id: ""
    } 

       fetch('https://api.x898xe.fun/api/user/addAddress', {
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'language': 'ina-BA',
            'token': token,
            'user-agent': 'Redmi Note 9 Pro(Android/10) (com.spsd.st/1.0.4) Weex/0.26.0 1080x2170',
            'Content-Type': 'application/json; charset=utf-8',
            //Content-Length: 83
            'Host': 'api.x898xe.fun',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
           }
       })
       .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

  //410B049F
(async () => {
    const reff = readlineSync.question('[?] Reff code: ')
    const jumlah = readlineSync.question('[?] Jumlah Reff: ')
    for (var l = 0; l < jumlah; l++){
    try {
        const rand = randomize('0', 5)
        const nomor = randomize('0', 8)
        const name = random.first()
        const username = `${name}${rand}`
        const regist = await functionRegist(username, nomor, reff)
        const login = await functionLogin(username)
        var token = login.data.token
        const add = await functionAlamat(token)
        if (login.msg == 'Operasi berhasil'){
            console.log('[+] Berhasil Login !')
            for (var i = 0; i < 20; i++){
            const order = await functionOrder(token)
            var orderId = order.data.orderid
            if (order.msg == 'Operasi berhasil'){
                console.log(`[${i+1}] Berhasil membuat order !`)
                const confim = await functionConfirm(orderId, token)
                if (confim.msg == 'Operasi berhasil'){
                    console.log(`[${i+1}] Berhasil confirm pesanan !`)
                } else {
                    console.log('[!] Gagal confirm pesanan !')
                }
            } else {
                console.log('[!] Gagal membuat order !')
            }
        }
        } else {
            console.log('[!] Gagal Login !')
        }
        console.log("")
} catch (e) {
    console.log(e)
    }
}
})()