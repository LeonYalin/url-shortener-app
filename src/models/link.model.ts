import { Document, Model, Schema, model } from "mongoose";

interface LinkDoc extends Document {
  original: string;
  short: string;
}

interface LinkModel extends Model<LinkDoc> {
  build(url: string): LinkDoc;
}

const linkSchema = new Schema<LinkDoc, LinkModel>(
  {
    original: { type: String, required: true },
    short: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
linkSchema.statics.build = function (original: string) {
  const short = original.substring(0, 3); // TODO: provide implementation
  return new Link({ original, short });
};

const Link = model<LinkDoc, LinkModel>("Link", linkSchema);

export { Link };
