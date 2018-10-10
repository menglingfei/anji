const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = merge(common, {
    plugins: [
        new UglifyJsPlugin({ // 压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require',"jQuery"] // 排除关键字
        }),
        new webpack.DefinePlugin({
            _URL: JSON.stringify('http://admin.yunzhizhan.cn'),
            _DISPLAY: JSON.stringify('3'),
            _TOKEN: JSON.stringify('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZiYWI4NzVjMzBjM2E2Y2MwOTI4MjVjYjI4NzkyNDI4ZThhMTI1NGQ1NzQwMmExYjkxZWI0MzZmMTExMTk5NDFlNzQzNWQ1NzY2NmFmN2VmIn0.eyJhdWQiOiIxIiwianRpIjoiZmJhYjg3NWMzMGMzYTZjYzA5MjgyNWNiMjg3OTI0MjhlOGExMjU0ZDU3NDAyYTFiOTFlYjQzNmYxMTExOTk0MWU3NDM1ZDU3NjY2YWY3ZWYiLCJpYXQiOjE1MzgwMzIyODgsIm5iZiI6MTUzODAzMjI4OCwiZXhwIjoxNTY5NTY4Mjg4LCJzdWIiOiIxMyIsInNjb3BlcyI6W119.fpxE2XCY1YvX4WJqO1bVOFkyUQ8NVfMowhjADzCyneR2c7rYGaSz_-0yiP2N9HAdYiEHd0pZENqUdVUPfNCN8xhkPFK4w-vPfOya-OwB4AHttIaYMCMUn2Z2gefJBdwra_FOEyAju8WHEtmgkLgFMvoPJwxI3uqQ8o--q_d_WxlLe7jW7D5wONFrjd9lHsW5Z4UnzROyHsKHBVlugP7G0u8fLG8xww1KmBQfakHxa1o1V4oFZYgMoY4QxA18uRTxw2OCGb1BWwYC-t9g7QtfnuJf6kk-A0HHjVMzmekiBLrGm-qzZ1bSPXgt67pchxVLVEKYrLWL62cyTsU4PFeSu1EvUhFy0JVRNm8MJwaXNGV5gRaYSK0odY5Z-T011a_GnnRz1kJb4JcwmdZeHw0mNfhgveZM7TpxvheHrJEPCUYE3zfuJcMul7YcTeDvXV9grmqWBCsQl6RxAh_od5gqbz4o5HpkIk18XMmCUKDm691kJLYRs8IzjfBSzUkgn6DRnqP71oOKRVd43bYGtWQB2a7mhsNbsEJCJhAY947TRh5vToboNVkxSDZqnsYH9XZ2984k2OY5axchfz7O6-huYPzoItivyprCRTD0vVo4GHpybfLR0qPMyBEgBeEVoLL3j1qURUsG7G2afFiFjoZfjVt-BGffSMUWzb81nLjg9i8 ')
        })
    ]
});
