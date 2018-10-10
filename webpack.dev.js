const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require("webpack");
module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            _URL: JSON.stringify('http://dev.yunzhizhan.cn'),
            _DISPLAY: JSON.stringify('45'),
            _TOKEN: JSON.stringify('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyMTM3YTg0ZGE3NDY5MmRlZjUxYjIyNTdhNDY5OGFjOTAwOTIzZDNhOTM0OWY3NTBkNTY3Mjg5NDRjNGY3NjBmYjYxY2NkYWNhMmJlZjBlIn0.eyJhdWQiOiIxIiwianRpIjoiNTIxMzdhODRkYTc0NjkyZGVmNTFiMjI1N2E0Njk4YWM5MDA5MjNkM2E5MzQ5Zjc1MGQ1NjcyODk0NGM0Zjc2MGZiNjFjY2RhY2EyYmVmMGUiLCJpYXQiOjE1Mzc1MTExMTQsIm5iZiI6MTUzNzUxMTExNCwiZXhwIjoxNTY5MDQ3MTE0LCJzdWIiOiIzMSIsInNjb3BlcyI6W119.or3MURA00gww_uX8Ke29_KxCL3ZIhJB82gQbeB9r4p3REn4mHm0OwHJO3WRbv6fih-0vg-WOQDX9MgOqEQ1jObVFL6W-2Wcl5r9-rfIZzdigFalWGwA6IXnUYaMb_zOHcs3FzdMQlNpFyNctOTffFqQCLhAHXRj3TWQmCzcQD4S8l3bGU4nI6v16zf_hJkeGIiKr2J9OxVVcRh04WrB1ExPUTny_TJPr_92p1vmcLPsjyISkVoo1gE1EwQ8X_iVb6IcK0P5ezzsVEDi590FgrJkb8XdWKezLRoGP6HarcJKzPYFgaX8jV50LzdUq5hws4sWgjBpeT9CrEx9seg5qvEZfl1Fm0cbTh0Nk9_OXMYPt-Luh7B_lTh072ipkVFN3A0KwfPwrlMbAmZQSVyReHBpRTEYxgcDRKJFSuWLupPJOBzKXWoeF92HNkPmE8G1xML1pl32jg1VUsXr4xO7_PmojAeHvgXNlapLVpiqtUJvuuN65uzSJIEc6ecmpweKyQpyilF5x2uBuJ5dFVYO2hD7hspt819VKF7nNklLZumiTMfz99VGXOxVNwLP6YeO0_QexAIxMhABxxO17RHxKvucn-fuExg4ZY1WwCbLnsD9c39n9AgVJ8O3vTS6BUQFhGy1TYUQ9tKElTT6qcFQKi20DBOublAimoJ4Cgoypg7A')
        })
    ]
});