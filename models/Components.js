import { Schema, model, models } from 'mongoose';

const componentSchema = new Schema({
    description: String,
    status: String,
    name: String,
  }
);

const Components = models.Components || model('Components', componentSchema);

export default Components;