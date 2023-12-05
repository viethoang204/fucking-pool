import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('event',
    new Schema({
        _id: {
            type: ObjectId,
            require: true
        },
        tournament: {
            _id: {
                type: ObjectId,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            slug: {
                type: String,
                require: false
            },
            image: {
                type: String,
                require: false
            },
            uniqueTournament:{
                _id: {
                    type: ObjectId,
                    require: true
                },
                name: {
                    type: String,
                    required: true
                },
                slug: {
                    type: String,
                    require: true
                },
                image: {
                    type: String,
                    required: false
                },
                userCount: {
                    type: Number,
                    require: false
                },
                category: {
                    _id: {
                        type: ObjectId,
                        require: true
                    },
                    name: {
                        type: String,
                        require: true
                    },
                    slug: {
                        type: String,
                        require: true
                    },
                    sport: {
                        _id: {
                            type: ObjectId,
                            require: true
                        },
                        name: {
                            type: String,
                            require: true
                        },
                        slug: {
                            type: String,
                            require: true
                        }
                    }
                }
            }
        },
        round: {
            type: Number,
            require: true
        },
        status: {
            code: {
                type: Number,
                require: true
            },
            description: {
                type: String,
                require: true
            },
            type: {
                type: String,
                require: true
            }
        },
        winnerCode: {
            type: Number,
            require: true
        },
        homeTeam: {
            _id: {
                type: ObjectId,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            slug: {
                type: String,
                require: true
            },
            shortName: {
                type: String,
                require: true
            },
            image: {
                type: String,
                require: false
            },
            sport: {
                _id: {
                    type: ObjectId,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                },
                slug: {
                    type: String,
                    require: true
                }
            },
            userCount: {
                type: Number,
                require: true
            },
            nameCode: {
                type: String,
                require: true
            },
            country: {
                _id: {
                    type: ObjectId,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                },
                slug: {
                    type: String,
                    require: true
                },
                alpha2: {
                    type: String,
                    require: true
                }
            }
        },
        awayTeam: {
            _id: {
                type: ObjectId,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            slug: {
                type: String,
                require: true
            },
            shortName: {
                type: String,
                require: true
            },
            image: {
                type: String,
                require: false
            },
            sport: {
                _id: {
                    type: ObjectId,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                },
                slug: {
                    type: String,
                    require: true
                }
            },
            userCount: {
                type: Number,
                require: true
            },
            nameCode: {
                type: String,
                require: true
            },
            country: {
                _id: {
                    type: ObjectId,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                },
                slug: {
                    type: String,
                    require: true
                },
                alpha2: {
                    type: String,
                    require: true
                }
            }
        },
        homeScore: {
            current: {
                type: Number,
                require: false
            },
            display: {
                type: Number,
                require: false
            },
            period1: {
                type: Number,
                require: false
            },
            period2: {
                type: Number,
                require: false
            },
            normaltime: {
                type: Number,
                require: false
            }
        },
        awayScore: {
            current: {
                type: Number,
                require: false
            },
            display: {
                type: Number,
                require: false
            },
            period1: {
                type: Number,
                require: false
            },
            period2: {
                type: Number,
                require: false
            },
            normaltime: {
                type: Number,
                require: false
            }
        },
        time: {
            injuryTime1: {
                type: Number,
                require: false
            },
            injuryTime2: {
                type: Number,
                require: false
            },
            currentReriodStartTimestamp: {
                type: Number,
                require: false
            }
        },
        startTimestamp: {
            type: Number,
            require: true
        },
        slug: {
            type: String,
            require: true
        },
        matchDiff: {
            type: Number,
            require: false
        },
        odd: {
            range: {
                type: Number,
                require: false
            },
            strong: {
                type: Number,
                require: false
            },
            draw: {
                type: Number,
                require: false
            },
            weak: {
                type: Number,
                require: false
            }
        },
        homePower: {
            type: Number,
            require: false
        },
        awayPower: {
            type: Number,
            require: false
        },
        strongerTeam: {
            type: Number,
            require: false
        },
        odd: {
            range: {
                type: Number,
                require: false
            },
            strong: {
                type: Number,
                require: false
            },
            draw: {
                type: Number,
                require: false
            },
            weak: {
                type: Number,
                require: false
            }
        }
    },
        { versionKey: false })
)