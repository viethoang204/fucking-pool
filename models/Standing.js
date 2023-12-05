import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('standing',
    new Schema({
        _id: { type: ObjectId },
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
                require: true
            },
            image: {
                type: String,
                require: false
            },
            uniqueTournament: {
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
                image: {
                    type: String,
                    require: false
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
                        }
                    }
                }
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
        },
        description: {
            type: String,
            require: false
        },
        team: {
            _id: {
                type: mongoose.Types.ObjectId,
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
                }
            },
            userCount: {
                type: Number,
                require: false
            },
            nameCode: {
                type: String,
                require: true
            },
            country: {
                _id: { type: ObjectId },
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
        position: {
            type: Number,
            require: true
        },
        matches: {
            type: Number,
            require: true
        },
        wins: {
            type: Number,
            require: true
        },
        scoresFor: {
            type: Number,
            require: true
        },
        scoresAgainst: {
            type: Number,
            require: true
        },
        losses: {
            type: Number,
            require: true
        },
        draws: {
            type: Number,
            require: true
        },
        points: {
            type: Number,
            require: true
        },
        updateAtTimestamp: {
            type: Number,
            require: true
        },
        power: {
            type: Number,
            require: false
        },
        round: {
            type: Number,
            require: false
        },
        buffPercent: {
            type: Number,
            require: false
        }
    },
        { versionKey: false })
)