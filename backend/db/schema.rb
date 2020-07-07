# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_07_165100) do

  create_table "graphic_novel_collections", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "graphic_novel_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["graphic_novel_id"], name: "index_graphic_novel_collections_on_graphic_novel_id"
    t.index ["user_id"], name: "index_graphic_novel_collections_on_user_id"
  end

  create_table "graphic_novels", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.string "cover_art"
    t.string "release_date"
    t.string "summary"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "novel_collections", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "novel_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["novel_id"], name: "index_novel_collections_on_novel_id"
    t.index ["user_id"], name: "index_novel_collections_on_user_id"
  end

  create_table "novels", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.string "cover_art"
    t.string "release_date"
    t.string "summary"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "graphic_novel_collections", "graphic_novels"
  add_foreign_key "graphic_novel_collections", "users"
  add_foreign_key "novel_collections", "novels"
  add_foreign_key "novel_collections", "users"
end
