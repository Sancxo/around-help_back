require "test_helper"

class ChatRoomUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @chat_room_user = chat_room_users(:one)
  end

  test "should get index" do
    get chat_room_users_url, as: :json
    assert_response :success
  end

  test "should create chat_room_user" do
    assert_difference("ChatRoomUser.count") do
      post chat_room_users_url, params: { chat_room_user: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show chat_room_user" do
    get chat_room_user_url(@chat_room_user), as: :json
    assert_response :success
  end

  test "should update chat_room_user" do
    patch chat_room_user_url(@chat_room_user), params: { chat_room_user: {  } }, as: :json
    assert_response :success
  end

  test "should destroy chat_room_user" do
    assert_difference("ChatRoomUser.count", -1) do
      delete chat_room_user_url(@chat_room_user), as: :json
    end

    assert_response :no_content
  end
end
