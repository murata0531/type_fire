const functions = require('firebase-functions')
// cloud functionでfirestoreを使うのに必要な設定は以下の２行
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
var fireStore = admin.firestore()

exports.helloWorld = functions.https.onRequest((request: any, response: { send: (arg0: string) => void }) => {
  // 動作確認のため適当なデータをデータベースに保存
  var citiesRef = fireStore.collection('cities');
  citiesRef.doc('SF').set({
    name: 'San Francisco', state: 'CA', country: 'USA',
    capital: false, population: 860000 })

  var cityRef = fireStore.collection('cities').doc('SF')
  cityRef.get()
  .then((doc: { exists: any; data: () => any }) => {
    if (!doc.exists) {
      response.send('No such document!')
    } else {
      response.send(doc.data())
      }
    })
    .catch((err: any) => {
      response.send('not found')
    })
})

// firestoreトリガー
exports.helloTrigger = functions.firestore.document('users/employee').onWrite((change: typeof functions, context: typeof functions) => {
    console.log("Hello Trigger！");

    const cityRef = fireStore.collection('users');
    const doc = cityRef.get();
    if (!doc.exists) {
    console.log('No such document!');
    } else {
    console.log('Document data:', doc.data());
    }
    return 0;
});