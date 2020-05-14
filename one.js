var timer = null;
var ids = [];
function getUserInfoById(id, wait = 10) {
    if (!timer) {
        ids[0] = id;
        timer = setTimeout(() => {
            timer = null;
            getUserInfo(ids).then(
                (data) => {
                    ids = []
                    console.log('result', data);
                }
            )

        }, wait);
    } else {
        ids.push(id);
    }
}

function getUserInfo(ids) {
    return new Promise((resolve) => {
        let result = [];
        for (let i = 0; i < ids.length; i++) {
            result.push(ids + 'result')
        }
        resolve(result)
    })
}

getUserInfoById(3)
setTimeout(() => {
    getUserInfoById(4)
}, 10);