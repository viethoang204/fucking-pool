import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('standingPrediction',
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
            require: true
        },
        team: {
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
        updateAtTimestamp: {
            type: Number,
            require: true
        },
        power: {
            type: Number,
            require: true
        },
    },
        { versionKey: false })
)