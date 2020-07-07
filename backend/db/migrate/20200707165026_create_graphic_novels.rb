class CreateGraphicNovels < ActiveRecord::Migration[6.0]
  def change
    create_table :graphic_novels do |t|

      t.timestamps
    end
  end
end
