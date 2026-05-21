---
title: "云原神国际版服务器"
date: 2024-08-10T01:25:04Z
draft: false
description: ""
tags: ["game", "genshin"]
---
国际版延时高，进不去
抓包软件？ 启动！

重写 api `https://sg-cg-api.hoyoverse.com/hk4e_global/cg/dispatcher/api/getNodesInfo`


```
{
  "retcode": 0,
  "message": "OK",
  "data": {
    "wait_seconds": 0,
    "nodes": [
      {
        "node_name": "A1",
        "net_state": "NetStateGood",
        "net_value": 22,
        "queue_state": "QueueStateLong",
        "queue_value": 2280,
        "recommend": true,
        "isp_type": 4,
        "region_ids": [
          "20107000055"
        ],
        "node_id": "2010",
        "node_alias": "A1",
        "vendor_id": 2,
        "node_alias_i18n": "dispatch_nodeName_1"
      },
      {
        "node_name": "A2",
        "net_state": "NetStateGood",
        "net_value": 33,
        "queue_state": "QueueStateLong",
        "queue_value": 1110,
        "recommend": false,
        "isp_type": 4,
        "region_ids": [
          "20207000065"
        ],
        "node_id": "2020",
        "node_alias": "A2",
        "vendor_id": 2,
        "node_alias_i18n": "dispatch_nodeName_2"
      },
      {
        "node_name": "S1",
        "net_state": "NetStateGood",
        "net_value": 400,
        "queue_state": "QueueStateLong",
        "queue_value": 1110,
        "recommend": true,
        "isp_type": 4,
        "region_ids": [
          "10907000036"
        ],
        "node_id": "1090",
        "node_alias": "S1",
        "vendor_id": 2,
        "node_alias_i18n": "dispatch_nodeName_0"
      }
    ],
    "network_info": null,
    "result_code": "NONE",
    "maintenance_info": null
  }
}
```

A是美国，S是新加坡哦！