require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  
  test 'is valid' do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      first_name: 'Test', 
      last_name: 'McTest',
      email: 'test3@test.com', 
      id_card: id_card,
      password: 'Test3Test3', 
      password_confirmation: 'Test3Test3'
    )
    assert user.valid?
  end

  test 'is invalid without a first_name' do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      last_name: "McTest", 
      email: "test3@test.com", 
      id_card: id_card,
      password: 'Test3Test3', 
      password_confirmation: 'Test3Test3'
    )
    refute user.valid?
    assert_not_nil user.errors[:first_name]
  end

  test 'is invalid without a last_name' do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      first_name: 'Test', 
      email: "test3@test.com", 
      id_card: id_card,
      password: 'Test3Test3', 
      password_confirmation: 'Test3Test3'
    )
    refute user.valid?
    assert_not_nil user.errors[:last_name]
  end

  test 'is invalid without an email' do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      first_name: 'Test', 
      last_name: "McTest", 
      id_card: id_card,
      password: 'Test3Test3', 
      password_confirmation: 'Test3Test3'
    )
    refute user.valid?
    assert_not_nil user.errors[:email]
  end

  test 'is invalid without an password' do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      first_name: 'Test', 
      last_name: "McTest", 
      email: "test3@test.com", 
      id_card: id_card,
      password_confirmation: 'Test3Test3'
    )
    refute user.valid?
    assert_not_nil user.errors[:password]
  end

  test 'is invalid without an password_confirmation' do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      first_name: 'Test', 
      last_name: "McTest", 
      email: "test3@test.com", 
      id_card: id_card,
      password: 'Test3Test3'
    )
    refute user.valid?
    assert_not_nil user.errors[:password_confirmation]
  end

  test 'is invalid with an email of an existing user' do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      first_name: 'Test', 
      last_name: "McTest", 
      email: users(:one), 
      id_card: id_card,
      password: 'Test3Test3', 
      password_confirmation: 'Test3Test3'    
    )
    refute user.valid?
    assert_not_nil user.errors[:email]
  end


  test "is invalid because password_confirmation doesn't match" do
    id_card = Rack::Test::UploadedFile.new(File.join(ActionDispatch::IntegrationTest.file_fixture_path, 'correct_id_card.jpg'), 'image/jpeg')

    user = User.new(
      first_name: 'Test', 
      last_name: "McTest", 
      email: "test3@test.com", 
      id_card: id_card,
      password: 'Test3Test3',
      password_confirmation: 'Test3Test4'    
    )
    refute user.valid?
    assert_not_nil user.errors[:password_confirmation]
  end

end
