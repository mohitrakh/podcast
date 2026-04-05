import mongoose, { Schema, Document } from 'mongoose';

export interface IPodcast extends Document {
  title: string;
  description: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PodcastSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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

export default mongoose.model<IPodcast>('Podcast', PodcastSchema);
