import mongoose, { Schema, Document } from 'mongoose';

export interface IEpisode extends Document {
  podcastId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  fileUrl: string;
  duration?: number;
  status: 'draft' | 'processing' | 'published';
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

const EpisodeSchema: Schema = new Schema(
  {
    podcastId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Podcast'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true,
      default: 'https://dummy.audio/test.mp3'
    },
    duration: {
      type: Number,
      required: false
    },
    status: {
      type: String,
      enum: ['draft', 'processing', 'published'],
      default: 'draft'
    },
    creatorId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export default mongoose.model<IEpisode>('Episode', EpisodeSchema);
