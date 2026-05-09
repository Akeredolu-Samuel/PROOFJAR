/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/workspace.json`.
 */
export type Workspace = {
  "address": "GJnVvUgGrUifyiGrs2NDbLdgqxVT5NbRvRhMYqPDMoLB",
  "metadata": {
    "name": "workspace",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claimReward",
      "discriminator": [
        149,
        95,
        181,
        242,
        94,
        90,
        158,
        162
      ],
      "accounts": [
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.authority",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "challenge",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  108,
                  108,
                  101,
                  110,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        },
        {
          "name": "participation",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "challenge"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "completeChallenge",
      "discriminator": [
        91,
        147,
        166,
        187,
        72,
        3,
        55,
        209
      ],
      "accounts": [
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "challenge",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  108,
                  108,
                  101,
                  110,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "createChallenge",
      "discriminator": [
        170,
        244,
        47,
        1,
        1,
        15,
        173,
        239
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.authority",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "challenge",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  108,
                  108,
                  101,
                  110,
                  103,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "challengeId"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "challengeId"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "category",
          "type": "u8"
        },
        {
          "name": "stakeAmount",
          "type": "u64"
        },
        {
          "name": "maxParticipants",
          "type": "u16"
        },
        {
          "name": "durationDays",
          "type": "u16"
        },
        {
          "name": "frequency",
          "type": "u8"
        },
        {
          "name": "proofType",
          "type": "u8"
        },
        {
          "name": "challengeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "expireChallenge",
      "discriminator": [
        73,
        82,
        20,
        227,
        216,
        66,
        58,
        41
      ],
      "accounts": [
        {
          "name": "challenge",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  108,
                  108,
                  101,
                  110,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "initUserProfile",
      "discriminator": [
        148,
        35,
        126,
        247,
        28,
        169,
        135,
        175
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.authority",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeConfig",
      "discriminator": [
        208,
        127,
        21,
        1,
        194,
        190,
        196,
        70
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "feeBps",
          "type": "u16"
        },
        {
          "name": "treasury",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "joinChallenge",
      "discriminator": [
        41,
        104,
        214,
        73,
        32,
        168,
        76,
        79
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.authority",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "challenge",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  108,
                  108,
                  101,
                  110,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        },
        {
          "name": "participation",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "challenge"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "submitProof",
      "discriminator": [
        54,
        241,
        46,
        84,
        4,
        212,
        46,
        94
      ],
      "accounts": [
        {
          "name": "challenge",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  108,
                  108,
                  101,
                  110,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        },
        {
          "name": "participation",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "challenge"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "proofRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  111,
                  102
                ]
              },
              {
                "kind": "account",
                "path": "participation"
              },
              {
                "kind": "account",
                "path": "participation.proofs_submitted",
                "account": "participation"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "proofHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "proofType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "verifyProof",
      "discriminator": [
        217,
        211,
        191,
        110,
        144,
        13,
        186,
        98
      ],
      "accounts": [
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "challenge",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  108,
                  108,
                  101,
                  110,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "challenge.id",
                "account": "challenge"
              }
            ]
          }
        },
        {
          "name": "participation",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "challenge"
              },
              {
                "kind": "account",
                "path": "participation.user",
                "account": "participation"
              }
            ]
          }
        },
        {
          "name": "proofRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  111,
                  102
                ]
              },
              {
                "kind": "account",
                "path": "participation"
              },
              {
                "kind": "arg",
                "path": "proofIndex"
              }
            ]
          }
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "participation.user",
                "account": "participation"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "proofIndex",
          "type": "u16"
        },
        {
          "name": "verified",
          "type": "bool"
        },
        {
          "name": "confidenceScore",
          "type": "u8"
        },
        {
          "name": "aiSummaryHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "challenge",
      "discriminator": [
        119,
        250,
        161,
        121,
        119,
        81,
        22,
        208
      ]
    },
    {
      "name": "config",
      "discriminator": [
        155,
        12,
        170,
        224,
        30,
        250,
        204,
        130
      ]
    },
    {
      "name": "participation",
      "discriminator": [
        237,
        154,
        142,
        46,
        143,
        63,
        189,
        18
      ]
    },
    {
      "name": "proofRecord",
      "discriminator": [
        237,
        59,
        155,
        172,
        204,
        117,
        87,
        44
      ]
    },
    {
      "name": "userProfile",
      "discriminator": [
        32,
        37,
        119,
        205,
        179,
        180,
        13,
        194
      ]
    },
    {
      "name": "vault",
      "discriminator": [
        211,
        8,
        232,
        43,
        2,
        152,
        117,
        119
      ]
    }
  ],
  "events": [
    {
      "name": "challengeCreated",
      "discriminator": [
        166,
        178,
        174,
        178,
        11,
        172,
        98,
        243
      ]
    },
    {
      "name": "challengeExpired",
      "discriminator": [
        8,
        175,
        9,
        64,
        0,
        48,
        124,
        120
      ]
    },
    {
      "name": "challengeJoined",
      "discriminator": [
        254,
        42,
        73,
        56,
        99,
        74,
        6,
        15
      ]
    },
    {
      "name": "proofSubmitted",
      "discriminator": [
        160,
        51,
        85,
        70,
        249,
        89,
        5,
        139
      ]
    },
    {
      "name": "proofVerified",
      "discriminator": [
        181,
        54,
        148,
        211,
        237,
        73,
        131,
        232
      ]
    },
    {
      "name": "rewardClaimed",
      "discriminator": [
        49,
        28,
        87,
        84,
        158,
        48,
        229,
        175
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "challengeNotActive",
      "msg": "Challenge is not active"
    },
    {
      "code": 6001,
      "name": "challengeFull",
      "msg": "Challenge is full"
    },
    {
      "code": 6002,
      "name": "alreadyJoined",
      "msg": "Already joined this challenge"
    },
    {
      "code": 6003,
      "name": "notParticipant",
      "msg": "Not a participant in this challenge"
    },
    {
      "code": 6004,
      "name": "proofTooEarly",
      "msg": "Proof submitted too early based on frequency"
    },
    {
      "code": 6005,
      "name": "challengeNotEnded",
      "msg": "Challenge has not ended yet"
    },
    {
      "code": 6006,
      "name": "alreadyClaimed",
      "msg": "Reward already claimed"
    },
    {
      "code": 6007,
      "name": "unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6008,
      "name": "invalidCategory",
      "msg": "Invalid category"
    },
    {
      "code": 6009,
      "name": "invalidStakeAmount",
      "msg": "Invalid stake amount"
    },
    {
      "code": 6010,
      "name": "overflowError",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6011,
      "name": "invalidParameter",
      "msg": "Invalid parameter"
    },
    {
      "code": 6012,
      "name": "configInactive",
      "msg": "Config is inactive"
    }
  ],
  "types": [
    {
      "name": "challenge",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "category",
            "type": "u8"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "maxParticipants",
            "type": "u16"
          },
          {
            "name": "currentParticipants",
            "type": "u16"
          },
          {
            "name": "durationDays",
            "type": "u16"
          },
          {
            "name": "frequency",
            "type": "u8"
          },
          {
            "name": "proofType",
            "type": "u8"
          },
          {
            "name": "totalPool",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "challengeCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "challengeId",
            "type": "u64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "maxParticipants",
            "type": "u16"
          },
          {
            "name": "durationDays",
            "type": "u16"
          },
          {
            "name": "vault",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "challengeExpired",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "challengeId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "challengeJoined",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "challengeId",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "feeBps",
            "type": "u16"
          },
          {
            "name": "totalChallenges",
            "type": "u64"
          },
          {
            "name": "totalUsers",
            "type": "u64"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "version",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "participation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "challenge",
            "type": "pubkey"
          },
          {
            "name": "stakedAmount",
            "type": "u64"
          },
          {
            "name": "proofsSubmitted",
            "type": "u16"
          },
          {
            "name": "proofsVerified",
            "type": "u16"
          },
          {
            "name": "joinedAt",
            "type": "i64"
          },
          {
            "name": "lastProofAt",
            "type": "i64"
          },
          {
            "name": "completed",
            "type": "bool"
          },
          {
            "name": "claimed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "proofRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participation",
            "type": "pubkey"
          },
          {
            "name": "proofIndex",
            "type": "u16"
          },
          {
            "name": "proofType",
            "type": "u8"
          },
          {
            "name": "proofHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "submittedAt",
            "type": "i64"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "confidenceScore",
            "type": "u8"
          },
          {
            "name": "aiSummaryHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "proofSubmitted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "challengeId",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "proofIndex",
            "type": "u16"
          },
          {
            "name": "proofHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "proofVerified",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "challengeId",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "proofIndex",
            "type": "u16"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "confidenceScore",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "rewardClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "challengeId",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "reward",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "reputation",
            "type": "u64"
          },
          {
            "name": "currentStreak",
            "type": "u16"
          },
          {
            "name": "bestStreak",
            "type": "u16"
          },
          {
            "name": "challengesJoined",
            "type": "u32"
          },
          {
            "name": "challengesWon",
            "type": "u32"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalEarned",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "challengeId",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
