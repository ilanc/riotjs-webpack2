import riot from 'riot'
import 'riot-hot-reload'
import './random.tag'
 import route from 'riot-route'

riot.mount('random', {
  title: 'Hi there!'
})

console.log(riot)
console.log(riot.observable)
console.log(riot.route)

function Init() {
  route(function (usertype, sequence, screen) {
    console.log(usertype, sequence, screen)
  })
  route.start()
  route.exec()
}
Init()