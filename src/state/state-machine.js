// var _ = require('underscore');

export default function stateMachine (advisors, province, get) {
  var navigatingTo = advisors.route.navigatesTo

  var homePage = province('home')
    .annexWhen(navigatingTo('home'))
    // .sub(
    //   province('homeSub1'),
    //   province.mutex(
    //     province('homeSub2')
    //       .sub(province('homeSub2.1')),
    //     province('homeSub3'),
    //     province('homeSub4'),
    //     province('homeSub5')
    //   ),
    //   province('homeSub6')
    // )

  // province.mutex(get(/homeSub1|homeSub3/, homePage.subprovinceinces), get('homeSub6', homePage.subprovinceinces))
  // province.mutex(get(/homeSub1|homeSub3/, homePage.subProvinces))

  province('play')
    .annexWhen(navigatingTo('Play'))
    .sub( province('modal'), province('modal2') )

  province('try')
    .annexWhen(navigatingTo('Try'))

  get('all', _.where(this.provinces.all, {level: 1}))
    .sub(province('error'))
}
