import fs from 'fs'
import { config } from '../src/config/firebase'
import * as firebase from 'firebase'
import {
  apps,
  initializeTestApp,
  loadFirestoreRules,
  assertFails,
  assertSucceeds,
} from '@firebase/testing'

const projectId = config.projectId as string

function getFirestore() {
  const app = initializeTestApp({
    projectId: projectId,
  })

  return app.firestore()
}

// 認証付きFirestoreクライアントの取得
function getFirestoreWithAuth() {
  const app = initializeTestApp({
    projectId: projectId,
    auth: { uid: 'test_user', email: 'test_user@example.com' },
  })

  return app.firestore()
}
describe('ordersコレクションへの認証付きアクセスを許可', () => {
  beforeEach(async () => {
    // セキュリティルールの読み込み
    await loadFirestoreRules({
      projectId: projectId,
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    })
  })
  afterEach(async () => {
    // 使用したアプリの削除
    await Promise.all(apps().map(app => app.delete()))
  })

  test('認証なしでのデータ保存に失敗', async () => {
    const db = getFirestore()
    const doc = db.collection('orders').doc('sample1')
    await assertFails(doc.set({ item: 'salad' }))
  })

  test('認証ありでのデータ保存に成功', async () => {
    const db = getFirestoreWithAuth()
    const doc = db.collection('orders').doc('sample2')
    await assertSucceeds(doc.set({ item: 'salad' }))
  })
})
