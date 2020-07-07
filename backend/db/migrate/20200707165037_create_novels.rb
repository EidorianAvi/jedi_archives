class CreateNovels < ActiveRecord::Migration[6.0]
  def change
    create_table :novels do |t|

      t.timestamps
    end
  end
end
